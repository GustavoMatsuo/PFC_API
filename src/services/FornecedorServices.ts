import { Endereco, Fornecedor } from "@models"
import { IFornecedorServices } from "@interfaces"
import { FornecedorRepository } from "@repositories"
import { ICreateFornecedorDTO, IUpdateFornecedorDTO } from "@dto/FornecedorDTO"
import { db } from "src/config/database"

export class FornecedorServices implements IFornecedorServices {
  private fornecedorRepository: FornecedorRepository

  constructor(fornecedorRepository:FornecedorRepository) {
    this.fornecedorRepository = fornecedorRepository
  }

  async index(limit:string, skip:string):Promise<Array<Fornecedor>> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const fornecedorList = await this.fornecedorRepository
      .createQueryBuilder("fornecedor")
      .leftJoinAndSelect("fornecedor.endereco", "endereco.id_endereco")
      .take(limitNum)
      .skip(skipNum)
      .getMany()

    return fornecedorList
  }

  async create(data:ICreateFornecedorDTO):Promise<void> {
    const fornecedorAlreadyExists = await this.fornecedorRepository.findOneBy({
      cnpj: data.cnpj
    })

    if (fornecedorAlreadyExists) {
      throw new Error('fornecedor already exists.')
    }
    const endereco = new Endereco(data.endereco)
    const fornecedor = new Fornecedor({...data, endereco, status: true})

    await this.fornecedorRepository.save(fornecedor)
  }

  async update(data:IUpdateFornecedorDTO):Promise<void> {
    const fornecedorExists = await this.fornecedorRepository.findOneBy({id_fornecedor: data.id_fornecedor})

    if (!fornecedorExists) {
      throw new Error('Fornecedor not found.')
    }

    await db.manager.transaction(async entityManager => { 
      await entityManager.update(Endereco, data.endereco.id_endereco, data.endereco)
      await entityManager.update(Fornecedor, data.id_fornecedor, data) 
    })
  }

  async changeStatus(id:string):Promise<void> {
    let fornecedorExists = await this.fornecedorRepository.findOneBy({id_fornecedor: id})

    if (!fornecedorExists) {
      throw new Error('Fornecedor not found.')
    }

    fornecedorExists.status = !fornecedorExists.status

    await this.fornecedorRepository.update(id, fornecedorExists)
  }

  async simpleList():Promise<Array<Object>> {
    const fornecedorList = await this.fornecedorRepository
      .createQueryBuilder("fornecedor")
      .select("fornecedor.id_fornecedor")
      .addSelect("fornecedor.nome")
      .getMany()

    return fornecedorList
  }
}
