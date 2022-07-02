import { Estoque } from "@models"
import { IEstoqueServices } from "@interfaces"
import { EstoqueRepository } from "@repositories"

export class EstoqueServices implements IEstoqueServices {
  private estoqueRepository: EstoqueRepository

  constructor(estoqueRepository:EstoqueRepository) {
    this.estoqueRepository = estoqueRepository
  }

  async index(limit:string, skip:string):Promise<Array<Estoque>> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const estoqueList:any[] = await this.estoqueRepository.createQueryBuilder("estoque")
    .leftJoinAndSelect("estoque.produto", "estoque.id_produto")
    .take(limitNum)
    .skip(skipNum)
    .getMany()

    return estoqueList
  }
}
