import { Saida } from "@models"
import { ISaidaServices } from "@interfaces"
import { SaidaRepository } from "@repositories"
import { ICreateSaidaDTO } from "@dto/SaidaDTO"
import { Paginationlist } from "src/globalTypes"

export class SaidaServices implements ISaidaServices {
  private saidaRepository: SaidaRepository

  constructor(saidaRepository:SaidaRepository) {
    this.saidaRepository = saidaRepository
  }

  async create(data:ICreateSaidaDTO):Promise<void> {
    const date = new Date()
    const venda = data.venda
    const saida = new Saida({ ...data, venda: venda, data_saida: date })

    await this.saidaRepository.save(saida)
  }

  async index(limit:string, skip:string):Promise<Paginationlist> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const saidaList = await this.saidaRepository
    .createQueryBuilder("saida")
    .leftJoinAndSelect("saida.venda", "venda.id_venda")
    .leftJoinAndSelect("saida.produto", "produto.id_produto")
    .take(limitNum)
    .skip(skipNum)
    .getMany()

    const sumRow = await this.saidaRepository.count()
    
    return {list: saidaList, total: sumRow}
  }
}
