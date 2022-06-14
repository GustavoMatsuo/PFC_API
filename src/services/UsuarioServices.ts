import { Usuario } from "@models"
import { IUsuarioServices } from "@interfaces"
import { IMailProvider } from '@providers/IMailProvider'
import { ICreateUsuarioDTO, ILoginUsuarioDTO, IUpdateUsuarioDTO } from '@dto/UsuarioDTO'
import { UsuarioRepository } from "@repositories"

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

  async index(limit, skip):Promise<Array<Usuario>> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const usuarioList = await this.usuarioRepository.find({
      take: limitNum,
      skip: skipNum
    })

    return usuarioList
  }

  async login(data:ILoginUsuarioDTO):Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        email: data.email,
        senha: data.senha
      },
    })

    if(usuario && !usuario.status){
      throw new Error('Usuario disabled.')
    }

    return usuario
  }

  async create(data:ICreateUsuarioDTO):Promise<void> {
    const usuarioAlreadyExists = await this.usuarioRepository.findOneBy({
      email: data.email
    })

    if (usuarioAlreadyExists) {
      throw new Error('Usuario already exists.')
    }

    const usuario = new Usuario({...data, status: true})

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
