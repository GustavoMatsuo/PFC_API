import { Endereco, Fornecedor } from "@models"
import { IFornecedorServices } from "@interfaces"
import { CreateFornecedorDTO, UpdateFornecedorDTO } from "@dto/FornecedorDTO"
import { Paginationlist } from "../globalTypes"
import { IFornecedorRepository } from "src/interfaces/Repositories/IFornecedorRepository"

export class FornecedorServices implements IFornecedorServices {
  private fornecedorRepository: IFornecedorRepository

  constructor(fornecedorRepository:IFornecedorRepository) {
    this.fornecedorRepository = fornecedorRepository
  }

  async index(
    empresa:string,
    limit?:number, 
    skip?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist> {
    const fornecedorList = this.fornecedorRepository.listFornecedor(
      empresa,
      limit, 
      skip, 
      filterBy,
      order,
      orderBy
    )

    return fornecedorList
  }

  async create(data:CreateFornecedorDTO):Promise<void> {
    const fornecedorAlreadyExists = await this.fornecedorRepository.findByCNPJ(
      data.cnpj,
      data.empresa
    )

    if (fornecedorAlreadyExists) {
      throw new Error('fornecedor already exists.')
    }

    const endereco = new Endereco(data.endereco)
    const fornecedor = new Fornecedor({
      ...data, 
      endereco, 
      status: true,
      empresa_id: data.empresa
    })

    await this.fornecedorRepository.saveFornecedor(fornecedor)
  }

  async update(data:UpdateFornecedorDTO):Promise<void> {
    const fornecedorExists = await this.fornecedorRepository.findById(
      data.id_fornecedor,
      data.empresa
    )

    if (!fornecedorExists) {
      throw new Error('Fornecedor not found.')
    }

    const fornecedor = new Fornecedor({...data, empresa_id: fornecedorExists.empresa_id})
    const endereco = new Endereco(data.endereco)

    await this.fornecedorRepository.updateFornecedor(fornecedor, endereco)
  }

  async changeStatus(id:string, empresa:string):Promise<void> {
    let fornecedorExists = await this.fornecedorRepository.findById(id, empresa)

    if (!fornecedorExists) {
      throw new Error('Fornecedor not found.')
    }

    fornecedorExists.status = !fornecedorExists.status

    await this.fornecedorRepository.updateFornecedor(
      fornecedorExists, 
      fornecedorExists.endereco
    )
  }

  async simpleList(empresa:string):Promise<Array<Object>> {
    const fornecedorList = await this.fornecedorRepository.simpleList(empresa)

    return fornecedorList
  }
}
