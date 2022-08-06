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

  async index(limit:string, skip:string, filterBy:string):Promise<Paginationlist> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const query = await this.entradaRepository
      .createQueryBuilder("entrada")
      .leftJoinAndSelect("entrada.produto", "produto")
      .take(limitNum)
      .skip(skipNum)

    if(filterBy) {
      query.where("LOWER(produto.nome) like LOWER(:nome)", { nome: `%${filterBy}%` })
    }

    const entradaList:any[] = await query.getMany()

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

    const sumRow = await query.getCount()
    
    return {list: entradaListFormatted, total: sumRow}
  }
}
