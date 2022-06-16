import { Saida } from "@models"
import { ISaidaServices } from "@interfaces"
import { SaidaRepository } from "@repositories"
import { ICreateSaidaDTO } from "@dto/SaidaDTO"

export class SaidaServices implements ISaidaServices {
  private saidaRepository: SaidaRepository

  constructor(saidaRepository:SaidaRepository) {
    this.saidaRepository = saidaRepository
  }

  async create(data:ICreateSaidaDTO):Promise<void> {
    const date = new Date()
    const saida = new Saida({ ...data, data_saida: date })

    await this.saidaRepository.save(saida)
  }

  async index(limit:string, skip:string):Promise<Array<Saida>> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const saidaList = await this.saidaRepository.find({
      take: limitNum,
      skip: skipNum
    })

    return saidaList
  }
}
