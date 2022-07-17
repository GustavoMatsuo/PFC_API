import { Entrada } from "@models"
import { IEntradaServices } from "src/interfaces/IEntradaServices"
import { EntradaRepository } from "@repositories"
import { ICreateEntradaDTO, IEntradaFormattedDTO } from "@dto/EntradaDTO"
import { Paginationlist } from "src/globalTypes"

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

  async index(limit:string, skip:string):Promise<Paginationlist> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const entradaList:any[] = await this.entradaRepository.createQueryBuilder("entrada")
    .leftJoinAndSelect("entrada.produto", "produto.id_produto")
    .take(limitNum)
    .skip(skipNum)
    .getMany()
    
    const entradaListFormatted:IEntradaFormattedDTO[] = entradaList.map(entrada => {
      return {
        id_entrada: entrada.id_entrada,
        id_produto: entrada.produto.id_produto,
        nome_produto: entrada.produto.nome,
        qtd: entrada.qtd,
        data_entrada: entrada.data_entrada,
        valor_unitario: entrada.valor_unitario
      }
    })

    const sumRow = await this.entradaRepository.count()
    
    return {list: entradaListFormatted, total: sumRow}
  }
}
