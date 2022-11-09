import { Entrada, Produto } from "@models"
import { IEntradaServices, IEntradaRepository, IProdutoRepository } from "@interfaces"
import { CreateEntradaDTO, EntradaFormattedDTO } from "@dto/EntradaDTO"
import { Paginationlist } from "../globalTypes"

export class EntradaServices implements IEntradaServices {
  private entradaRepository: IEntradaRepository
  private produtoRepository: IProdutoRepository

  constructor(
    entradaRepository:IEntradaRepository, 
    produtoRepository:IProdutoRepository
  ) {
    this.entradaRepository = entradaRepository
    this.produtoRepository = produtoRepository
  }

  async create(data:CreateEntradaDTO):Promise<void> {
    const date = new Date()

    const produto = await this.produtoRepository.findById(data.produto, data.empresa)
    const entrada = new Entrada({ 
      ...data, 
      data_entrada: date,
      produto: produto,
      empresa_id: data.empresa
    })

    await this.entradaRepository.saveEntrada(entrada)
  }

  async index(
    empresa:string,
    limit?:number,
    skip?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist> {
    const entradaList = await this.entradaRepository.listEntrada(
      empresa,
      limit, 
      skip, 
      filterBy,
      order,
      orderBy
    )

    const entradaListFormatted:EntradaFormattedDTO[] = entradaList.list.map(entrada => {
      const produto:Produto = entrada.produto
      return {
        id_entrada: entrada.id_entrada,
        id_produto: produto.id_produto,
        nome_produto: produto.nome,
        qtd: entrada.qtd,
        data_entrada: entrada.data_entrada,
        valor_unitario: entrada.valor_unitario
      }
    })

    return {list: entradaListFormatted, total: entradaList.total}
  }
}
