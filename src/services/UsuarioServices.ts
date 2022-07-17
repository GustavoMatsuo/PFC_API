import { Usuario } from "@models"
import { IUsuarioServices } from "@interfaces"
// import { IMailProvider } from '@providers/IMailProvider'
import { ICreateUsuarioDTO, ILoginUsuarioDTO, IUpdateUsuarioDTO } from '@dto/UsuarioDTO'
import { UsuarioRepository } from "@repositories"
import { Paginationlist } from "src/globalTypes"
import { hash, compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { loginType } from "src/interfaces/IUsuarioServices"

export class UsuarioServices implements IUsuarioServices {
  private usuarioRepository: UsuarioRepository
  // private mailProvider:IMailProvider

  constructor(
    usuarioRepository:UsuarioRepository,
    // mailProvider:IMailProvider,
  ) {
    this.usuarioRepository = usuarioRepository
    // this.mailProvider = mailProvider
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

    if(usuario && !usuario.status){
      throw new Error('Usuario disabled.')
    }

    const isValidPassword = await compare(data.senha, usuario.senha)

    if(!isValidPassword) {
      return null
    }

    const token = sign({id: usuario.id_usuario}, "secret", { expiresIn: "10s" })
    
    return {
      id: usuario.id_usuario, 
      name: usuario.nome, 
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

    const usuario = new Usuario(data)

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
}
