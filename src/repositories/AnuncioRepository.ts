import { Anuncio } from "@models"
import { IAnuncioRepository } from "@interfaces"
import { Repository } from "typeorm"

export class AnuncioRepository implements IAnuncioRepository{
  private connection: Repository<Anuncio>

  constructor(connection:Repository<Anuncio>) {
    this.connection = connection
  }

  async listAnuncio(empresa:string): Promise<Anuncio[]> {
    const result = this.connection.findBy({
      empresa_id: empresa
    })

    return result
  }

  async simpleList(empresa:string):Promise<Anuncio[]> {
    const simpleList = await this.connection
      .createQueryBuilder("anuncio")
      .select("anuncio.id_anuncio")
      .addSelect("anuncio.titulo")
      .addSelect("anuncio.texto")
      .addSelect("anuncio.data")
      .where("anuncio.empresa_id = :empresa", { empresa })
      .getMany()
    
    return simpleList
  }

  async findById(id:string, empresa:string): Promise<Anuncio> {
    const result = await this.connection.findOneBy({
      id_anuncio: id,
      empresa_id: empresa
    })

    return result
  }

  async saveAnuncio(anuncio:Anuncio):Promise<Anuncio> {
    const result = this.connection.save(anuncio)

    return result
  }

  async updateAnuncio(anuncio:Anuncio):Promise<boolean> {
    const result = await this.connection.update(anuncio.id_anuncio, anuncio)

    return result.affected === 1
  }

  async delete(id:string): Promise<boolean> {
    const result = await this.connection.delete(id)

    return result.affected === 1
  }
}