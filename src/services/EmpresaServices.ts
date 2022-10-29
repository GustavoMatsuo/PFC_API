import { Endereco, Empresa } from "@models"
import { IEmpresaServices } from "@interfaces"
import { EmpresaRepository } from "@repositories"
import { ICreateEmpresaDTO, IUpdateEmpresaDTO } from "@dto/EmpresaDTO"
import { db } from "../config/database"
import { Paginationlist } from "../globalTypes"

export class EmpresaServices implements IEmpresaServices {
  private empresaRepository: EmpresaRepository

  constructor(empresaRepository:EmpresaRepository) {
    this.empresaRepository = empresaRepository
  }

  async index(
    limit:string, 
    skip:string, 
    filterBy:string,
    order:string,
    orderBy:string
  ):Promise<Paginationlist> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const query = this.empresaRepository
      .createQueryBuilder("empresa")
      .leftJoinAndSelect("empresa.endereco", "endereco.id_endereco")
      .take(limitNum)
      .skip(skipNum)

    if(filterBy) {
      query.where("LOWER(empresa.nome) like LOWER(:nome)", { nome: `%${filterBy}%` })
    }

    if(order && orderBy) {
      const descOrAsc = String(order).toUpperCase() === "DESC"? "DESC":"ASC"
      query.orderBy(`empresa.${orderBy}`, descOrAsc)
    }

    const empresaList = await query.getMany()

    const sumRow = await query.getCount()

    return {list: empresaList, total: sumRow}
  }

  async create(data:ICreateEmpresaDTO):Promise<void> {
    const empresaAlreadyExists = await this.empresaRepository.findOneBy({
      cnpj: data.cnpj
    })

    if (empresaAlreadyExists) {
      throw new Error('empresa already exists.')
    }

    const endereco = new Endereco(data.endereco)
    const empresa = new Empresa({...data, endereco, status: true})

    await this.empresaRepository.save(empresa)
  }

  async update(data:IUpdateEmpresaDTO):Promise<void> {
    const empresaExists = await this.empresaRepository.findOneBy({id_empresa: data.id_empresa})

    if (!empresaExists) {
      throw new Error('Empresa not found.')
    }

    await db.manager.transaction(async entityManager => { 
      await entityManager.update(Endereco, data.endereco.id_endereco, data.endereco)
      await entityManager.update(Empresa, data.id_empresa, data) 
    })
  }

  async changeStatus(id:string):Promise<void> {
    let empresaExists = await this.empresaRepository.findOneBy({id_empresa: id})

    if (!empresaExists) {
      throw new Error('Empresa not found.')
    }

    empresaExists.status = !empresaExists.status

    await this.empresaRepository.update(id, empresaExists)
  }
}
