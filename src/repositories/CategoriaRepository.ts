import { Categoria } from "@models"
import { Repository } from "typeorm"
import { ICategoriaRepository } from "@interfaces"

export class CategoriaRepository implements ICategoriaRepository {
  private connection: Repository<Categoria>

  constructor(connection:Repository<Categoria>) {
    this.connection = connection
  }

  async listCategoria(empresa:string): Promise<Categoria[]> {
    const result = this.connection.findBy({
      empresa_id: empresa
    })

    return result
  }

  async simpleList(empresa:string):Promise<Categoria[]> {
    const simpleList = await this.connection
      .createQueryBuilder("categoria")
      .select("categoria.id_categoria")
      .addSelect("categoria.nome")
      .where("categoria.empresa_id = :empresa", { empresa })
      .getMany()
    
    return simpleList
  }

  async findByNome(nome:string, empresa:string): Promise<Categoria> {
    const result = this.connection.findOneBy({
      nome: nome, 
      empresa_id: empresa
    })

    return result
  }

  async saveCategoria(categoria:Categoria):Promise<Categoria> {
    const result = this.connection.save(categoria)

    return result
  }

  async updateCategoria(categoria:Categoria):Promise<boolean> {
    const result = await this.connection.update(categoria.id_categoria, categoria)

    return result.affected === 1
  }

  async findById(id:string, empresa:string): Promise<Categoria> {
    const result = await this.connection.findOneBy({
      id_categoria: id,
      empresa_id: empresa
    })

    return result
  }

  async delete(id:string): Promise<boolean> {
    const result = await this.connection.delete(id)

    return result.affected === 1
  }
}
