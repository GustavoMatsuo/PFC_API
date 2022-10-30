import { Usuario } from "@models"
import { loginType } from "@interfaces"
import { IUsuarioServices, IMailProvider } from "@interfaces"
import { UsuarioRepository } from "@repositories"
import { 
  ICreateUsuarioDTO, 
  ILoginUsuarioDTO,
  IUpdateUsuarioDTO 
} from '@dto/UsuarioDTO'
import { Paginationlist } from "../globalTypes"
import { hash, compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { resetPassword } from "../templates/resetPassword"
import { newUser } from "../templates/newUser"

const API_URL = "https://tag-project.azurewebsites.net" 

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

  async index(
    empresa:string,
    limit:string, 
    skip:string, 
    filterBy:string,
    order:string,
    orderBy:string
  ):Promise<Paginationlist> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const query = this.usuarioRepository
      .createQueryBuilder("usuario")
      .where("usuario.empresa_id = :empresa", { empresa })
      .andWhere("usuario.cargo <> 'admin global'")
      .take(limitNum)
      .skip(skipNum)
    
    if(filterBy) {
      query.andWhere("LOWER(usuario.nome) like LOWER(:nome)", { nome: `%${filterBy}%` })
    }

    if(order && orderBy) {
      const descOrAsc = String(order).toUpperCase() === "DESC"? "DESC":"ASC"
      query.orderBy(`usuario.${orderBy}`, descOrAsc)
    }

    const usuarioList = await query.getMany()

    const sumRow = await query.getCount()
    
    return {list: usuarioList, total: sumRow}
  }

  async login(data:ILoginUsuarioDTO):Promise<loginType> {
    let usuario:Usuario = null
    
    if(data.email){
      usuario = await this.usuarioRepository.findOne({
        where: { email: data.email.toLowerCase() }
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

    const token = sign(
      {
        id: usuario.id_usuario,
        empresa: usuario.empresa_id,
        role: usuario.cargo
      }, 
      "secret", //MODIFY IN FUTURE
      { expiresIn: "1d" }
    )
    
    return {
      id: usuario.id_usuario, 
      nome: usuario.nome, 
      email: usuario.email,
      cargo: usuario.cargo,
      token: token
    }
  }

  async create(data:ICreateUsuarioDTO):Promise<void> {
    const usuarioAlreadyExists = await this.usuarioRepository.findOneBy({
      email: data.email.toLowerCase()
    })

    if (usuarioAlreadyExists) {
      throw new Error('Usuario already exists.')
    }

    const hash_password = await hash(data.senha, 8)

    const usuario = new Usuario({
      ...data, 
      email: data.email.toLowerCase(),
      senha: hash_password,
      status: true,
      empresa: data.empresa,
      empresa_id: data.empresa,
      verificado: false
    })

    const usuarioRegistred = await this.usuarioRepository.save(usuario)

    const token = sign({id: usuarioRegistred.id_usuario}, "secret", { expiresIn: "1h" })

    const urlReset = `${API_URL}/verificar/${token}`
    
    const templateEmail = newUser
      .replaceAll("{{email}}", usuarioRegistred.email)
      .replaceAll("{{nome}}", usuarioRegistred.nome)
      .replaceAll("{{link}}", urlReset)

    await this.mailProvider.sendMail({
      to: {
        name: usuarioRegistred.nome,
        email: usuarioRegistred.email,
      },
      subject: 'Verificação de conta',
      body: templateEmail
    })
  }

  async update(data:IUpdateUsuarioDTO):Promise<void> {
    const usuarioExists = await this.usuarioRepository.findOneBy({id_usuario: data.id_usuario})

    if (!usuarioExists || !(usuarioExists.id_usuario === data.id_usuario)) {
      throw new Error('Usuario not found.')
    }

    let senha = usuarioExists.senha

    if(data.senha && data.senha.length > 2) {
      const hash_password = await hash(data.senha, 8)
      senha = hash_password
    }

    const usuario = new Usuario({
      ...data, 
      senha: senha,
      empresa: data.empresa,
      empresa_id: data.empresa
    })

    await this.usuarioRepository.update(data.id_usuario, usuario)
  }

  async delete(userId:string, empresaId:string):Promise<void> {
    const usuarioExists = await this.usuarioRepository.findOneBy({
      id_usuario: userId, 
      empresa_id: empresaId
    })

    if (!usuarioExists || !(usuarioExists.id_usuario === userId)) {
      throw new Error('Usuario not found.')
    }

    if (usuarioExists.verificado) {
      throw new Error('Usuario is not able to delete.')
    }

    await this.usuarioRepository.delete(userId)
  }

  async changeStatus(userId:string, empresaId:string):Promise<void> {
    let usuarioExists = await this.usuarioRepository.findOneBy({
      id_usuario: userId, 
      empresa_id: empresaId
    })

    if (!usuarioExists || !(usuarioExists.id_usuario === userId)) {
      throw new Error('Usuario not found.')
    }

    usuarioExists.status = !usuarioExists.status

    await this.usuarioRepository.update(userId, usuarioExists)
  }

  async reset(email:string):Promise<void> {
    let usuarioExists:Usuario = null
    
    if(email){
      usuarioExists = await this.usuarioRepository.findOne({
        where: { email: email }
      })
    }

    if (!usuarioExists || !(usuarioExists.email === email)) {
      throw new Error('Usuario not found.')
    }

    if(!usuarioExists.status){
      throw new Error('Usuario disabled.')
    }

    const token = sign({id: usuarioExists.id_usuario}, "secret", { expiresIn: "1h" })

    const urlReset = `${API_URL}/reset/${token}`
    
    const templateEmail = resetPassword
      .replaceAll("{{email}}", usuarioExists.email)
      .replaceAll("{{nome}}", usuarioExists.nome)
      .replaceAll("{{link}}", urlReset)

    await this.mailProvider.sendMail({
      to: {
        name: usuarioExists.nome,
        email: usuarioExists.email,
      },
      subject: 'Soliciatcão de nova senha',
      body: templateEmail
    })
  }

  async newPassword(senha:string, userId: string):Promise<void> {
    let usuarioExists = await this.usuarioRepository.findOneBy({id_usuario: userId})

    if (!usuarioExists && !(usuarioExists.id_usuario === userId)) {
      throw new Error('Usuario not found.')
    }
    
    const hash_password = await hash(senha, 8)
    usuarioExists.senha = hash_password
    usuarioExists.verificado = true

    await this.usuarioRepository.update(usuarioExists.id_usuario, usuarioExists)
  }
}
