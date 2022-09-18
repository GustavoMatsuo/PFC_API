import { Anuncio } from "@models"
import { IAnuncioServices } from "src/interfaces/IAnuncioServices"
import { AnuncioRepository } from "@repositories"
import { ICreateAnuncioDTO, IUpdateAnuncioDTO } from "@dto/AnuncioDTO"

export class AnuncioServices implements IAnuncioServices {
  private anuncioRepository: AnuncioRepository

  constructor(anuncioRepository:AnuncioRepository) {
    this.anuncioRepository = anuncioRepository
  }

  async create(data:ICreateAnuncioDTO):Promise<void> {
    const today:Date = new Date()
    const anuncio = new Anuncio({
      ...data,
      data: today,
      usuarioId: data.usuario,
      empresaId: data.empresa
    })

    await this.anuncioRepository.save(anuncio)
  }

  async read(id:string, empresa:string):Promise<Anuncio> {
    const anuncio = await this.anuncioRepository.findOneBy({
      id_anuncio: id,
      empresaId: empresa
    })

    return anuncio
  }

  async update(data:IUpdateAnuncioDTO):Promise<void> {
    const anuncioExists = await this.anuncioRepository.findOneBy({
      id_anuncio: data.id_anuncio,
      empresaId: data.empresa
    })

    if (!anuncioExists) {
      throw new Error('Anuncio not found.')
    }

    const anuncio = new Anuncio({
      ...data, 
      data: anuncioExists.data,
      usuarioId: data.usuario,
      empresaId: data.empresa
    })
    await this.anuncioRepository.update(data.id_anuncio, anuncio)
  }

  async delete(id:string, empresa:string):Promise<void> {
    const anuncioExists = await this.anuncioRepository.findOneBy({
      id_anuncio: id, 
      empresaId: empresa
    })

    if (!anuncioExists) {
      throw new Error('Anuncio not found.')
    }

    await this.anuncioRepository.delete(anuncioExists.id_anuncio)
  }

  async index():Promise<Array<Anuncio>> {
    const anuncioList = await this.anuncioRepository.find()

    return anuncioList
  }

  async simpleList(empresa:string):Promise<Array<Object>> {
    const anuncioList = await this.anuncioRepository
      .createQueryBuilder("anuncio")
      .select("anuncio.id_anuncio")
      .addSelect("anuncio.titulo")
      .addSelect("anuncio.texto")
      .addSelect("anuncio.data")
      .where("anuncio.empresaId = :empresa", { empresa })
      .getMany()

    return anuncioList
  }
}
