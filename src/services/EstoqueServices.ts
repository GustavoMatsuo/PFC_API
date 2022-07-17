import { Estoque } from "@models"
import { IEstoqueServices } from "@interfaces"
import { EstoqueRepository } from "@repositories"

export class EstoqueServices implements IEstoqueServices {
  private estoqueRepository: EstoqueRepository

  constructor(estoqueRepository:EstoqueRepository) {
    this.estoqueRepository = estoqueRepository
  }

  async index():Promise<Array<Estoque>> {
    const estoqueList:any[] = await this.estoqueRepository.createQueryBuilder("estoque")
      .leftJoinAndSelect("estoque.produto", "estoque.id_produto")
      .getMany()

    return estoqueList
  }
}
