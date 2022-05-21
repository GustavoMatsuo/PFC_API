import { Fornecedor } from "@models"
import { IFornecedorServices } from "@interfaces"
import { FornecedorRepository } from "@repositories"

export class FornecedorServices implements IFornecedorServices {
  private fornecedorRepository: FornecedorRepository

  constructor(fornecedorRepository:FornecedorRepository) {
    this.fornecedorRepository = fornecedorRepository
  }

  async index(limit, skip):Promise<Array<Fornecedor>> {
    const fornecedorList = await this.fornecedorRepository.find({
      take: limit,
      skip: skip
    })

    return fornecedorList
  }
}
