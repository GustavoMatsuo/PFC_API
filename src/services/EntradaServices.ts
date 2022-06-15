import { Entrada } from "@models"
import { IEntradaServices } from "src/interfaces/IEntradaServices"
import { EntradaRepository } from "@repositories"
import { ICreateEntradaDTO } from "@dto/EntradaDTO"

export class EntradaServices implements IEntradaServices {
  private entradaRepository: EntradaRepository

  constructor(entradaRepository:EntradaRepository) {
    this.entradaRepository = entradaRepository
  }

  async create(data:ICreateEntradaDTO):Promise<void> {
    const date = new Date()
    const entrada = new Entrada({ ...data, data_entrada: date })

    await this.entradaRepository.save(entrada)
  }

  async index(limit:string, skip:string):Promise<Array<Entrada>> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const entradaList = await this.entradaRepository.find({
      take: limitNum,
      skip: skipNum
    })

    return entradaList
  }
}
