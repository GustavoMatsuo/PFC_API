import { Usuario } from "@models"
import { IUsuarioServices } from "@interfaces"
import { IMailProvider } from '@providers/IMailProvider'
import { ICreateUsuarioDTO, ILoginUsuarioDTO, IUpdateUsuarioDTO } from '@dto/UsuarioDTO'
import { UsuarioRepository } from "@repositories"
import { Paginationlist } from "src/globalTypes"
import { hash, compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { loginType } from "src/interfaces/IUsuarioServices"
import { resetPassword } from "../templates/resetPassword"

export class UsuarioServices implements IUsuarioServices {
  private usuarioRepository: UsuarioRepository
  private mailProvider:IMailProvider

  constructor(
    usuarioRepository:UsuarioRepository,
    mailProvider:IMailProvider,
  ) {
    this.usuarioRepository = usuarioRepository
    this.mailProvider = mailProvider
  }

  async index(limit, skip):Promise<Paginationlist> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const usuarioList = await this.usuarioRepository.find({
      take: limitNum,
      skip: skipNum
    })

    const sumRow = await this.usuarioRepository.count()
    
    return {list: usuarioList, total: sumRow}
  }

  async login(data:ILoginUsuarioDTO):Promise<loginType> {
    let usuario:Usuario = null
    
    if(data.email){
      usuario = await this.usuarioRepository.findOne({
        where: { email: data.email }
      })
    }

    if(!usuario){
     return null
    }

    if(!usuario.status){
      throw new Error('Usuario disabled.')
    }

    const isValidPassword = await compare(data.senha, usuario.senha)

    if(!isValidPassword) {
      return null
    }

    const token = sign({id: usuario.id_usuario}, "secret", { expiresIn: "1d" })
    
    return {
      id: usuario.id_usuario, 
      nome: usuario.nome, 
      email: usuario.email,
      token: token 
    }
  }

  async create(data:ICreateUsuarioDTO):Promise<void> {
    const usuarioAlreadyExists = await this.usuarioRepository.findOneBy({
      email: data.email
    })

    if (usuarioAlreadyExists) {
      throw new Error('Usuario already exists.')
    }

    const hash_password = await hash(data.senha, 8)

    const usuario = new Usuario({...data, senha: hash_password, status: true})

    await this.usuarioRepository.save(usuario)
  }

  async update(data:IUpdateUsuarioDTO):Promise<void> {
    const usuarioExists = await this.usuarioRepository.findOneBy({id_usuario: data.id_usuario})

    if (!usuarioExists) {
      throw new Error('Usuario not found.')
    }

    let senha = usuarioExists.senha

    if(data.senha && data.senha.length > 2) {
      const hash_password = await hash(data.senha, 8)
      senha = hash_password
    }

    const usuario = new Usuario({...data, senha: senha})

    await this.usuarioRepository.update(data.id_usuario, usuario)
  }

  async delete(id:string):Promise<void> {
    const usuarioExists = await this.usuarioRepository.findBy({id_usuario: id})

    if (!usuarioExists) {
      throw new Error('Usuario not found.')
    }

    await this.usuarioRepository.delete(id)
  }

  async changeStatus(id:string):Promise<void> {
    let usuarioExists = await this.usuarioRepository.findOneBy({id_usuario: id})

    if (!usuarioExists) {
      throw new Error('Usuario not found.')
    }

    usuarioExists.status = !usuarioExists.status

    await this.usuarioRepository.update(id, usuarioExists)
  }

  async reset(email:string):Promise<void> {
    let usuario:Usuario = null
    
    if(email){
      usuario = await this.usuarioRepository.findOne({
        where: { email: email }
      })
    }

    if(!usuario) {
      throw new Error('Usuario not found.')
    }

    if(!usuario.status){
      throw new Error('Usuario disabled.')
    }

    const token = sign({id: usuario.id_usuario}, "secret", { expiresIn: "1h" })

    const urlReset = `http://localhost:3000/reset/${token}`
    
    const templateEmail = resetPassword
      .replaceAll("{{email}}", usuario.email)
      .replaceAll("{{nome}}", usuario.nome)
      .replaceAll("{{link}}", urlReset)

    await this.mailProvider.sendMail({
      to: {
        name: usuario.nome,
        email: usuario.email,
      },
      from: {
        name: 'Equipe do Meu App',
        email: 'equipe@meuapp.com',
      },
      subject: 'Soliciatcão de nova senha',
      body: templateEmail
    })
  }

  async newPassword(senha:string, userId: string):Promise<void> {
    let usuarioExists = await this.usuarioRepository.findOneBy({id_usuario: userId})

    if (!usuarioExists) {
      throw new Error('Usuario not found.')
    }
    
    const hash_password = await hash(senha, 8)
    usuarioExists.senha = hash_password

    await this.usuarioRepository.update(userId, usuarioExists)
  }
}
