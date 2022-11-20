import { Repository } from "typeorm"
import { Usuario } from "@models"
import { IUsuarioRepository } from "@interfaces"

export class UsuarioRepository implements IUsuarioRepository {
  private connection: Repository<Usuario>

  constructor(connection:Repository<Usuario>) {
    this.connection = connection
  }

  async listUsuario(
    empresa:string,
    limit?:number, 
    skip?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string,
    withAdm?:boolean
  ): Promise<{ list: Usuario[]; total: number }> {
    const query = this.connection
      .createQueryBuilder("usuario")
      .where("usuario.empresa_id = :empresa", { empresa })

    if(!withAdm) query.andWhere("usuario.cargo <> 'admin global'")

    if(limit) query.take(limit)
    if(skip) query.skip(skip)
    
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

  async findById(id: string, empresa: string): Promise<Usuario> {
    const result = await this.connection.findOneBy({
      id_usuario: id,
      empresa_id: empresa
    })

    return result
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.connection.findOne({
      where: { email: email.toLowerCase() }
    })

    return usuario
  }

  async saveUsuario(usuario: Usuario): Promise<Usuario> {
    const result = await this.connection.save(usuario)

    return result
  }

  async updateUsuario(usuario: Usuario): Promise<boolean> {
    const result = await this.connection.update(usuario.id_usuario, usuario)

    return result.affected === 1
  }

  async deleteUsuario(usuario: Usuario): Promise<boolean> {
    const result = await this.connection.delete(usuario.id_usuario)

    return result.affected === 1
  }
}