import { Anuncio } from "@models"
import { IAnuncioServices } from "@interfaces"
import { CreateAnuncioDTO, UpdateAnuncioDTO } from "@dto/AnuncioDTO"
import { IAnuncioRepository } from "src/interfaces/Repositories/IAnuncioRepository"

export class AnuncioServices implements IAnuncioServices {
  private anuncioRepository: IAnuncioRepository

  constructor(anuncioRepository:IAnuncioRepository) {
    this.anuncioRepository = anuncioRepository
  }

  async create(data:CreateAnuncioDTO):Promise<void> {
    const today:Date = new Date()
    const anuncio = new Anuncio({
      ...data,
      data: today,
      usuario_id: data.usuario,
      empresa_id: data.empresa
    })

    await this.anuncioRepository.saveAnuncio(anuncio)
  }

  async read(id:string, empresa:string):Promise<Anuncio> {
    const anuncio = await this.anuncioRepository.findById(id, empresa)

    return anuncio
  }

  async update(data:UpdateAnuncioDTO):Promise<void> {
    const anuncioExists = await this.anuncioRepository.findById(
      data.id_anuncio,
      data.empresa
    )

    if (!anuncioExists) {
      throw new Error('Anuncio not found.')
    }

    const anuncio = new Anuncio({
      ...data, 
      data: anuncioExists.data,
      usuario_id: data.usuario,
      empresa_id: data.empresa
    })

    await this.anuncioRepository.updateAnuncio(anuncio)
  }

  async delete(id:string, empresa:string):Promise<void> {
    const anuncioExists = await this.anuncioRepository.findById(id, empresa)

    if (!anuncioExists) {
      throw new Error('Anuncio not found.')
    }

    await this.anuncioRepository.delete(anuncioExists.id_anuncio)
  }

  async index(empresa):Promise<Array<Anuncio>> {
    const anuncioList = await this.anuncioRepository.listAnuncio(empresa)

    return anuncioList
  }

  async simpleList(empresa:string):Promise<Array<Object>> {
    const anuncioList = await this.anuncioRepository.simpleList(empresa)

    return anuncioList
  }
}
