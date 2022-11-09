import { Endereco, Empresa } from "@models"
import { IEmpresaServices, IEmpresaRepository } from "@interfaces"
import { CreateEmpresaDTO, UpdateEmpresaDTO } from "@dto/EmpresaDTO"
import { Paginationlist } from "../globalTypes"

export class EmpresaServices implements IEmpresaServices {
  private empresaRepository: IEmpresaRepository

  constructor(empresaRepository:IEmpresaRepository) {
    this.empresaRepository = empresaRepository
  }

  async index(
    limit:number, 
    skip:number, 
    filterBy:string,
    order:string,
    orderBy:string
  ):Promise<Paginationlist> {
    const empresaList = this.empresaRepository.listEmpresa(
      limit, 
      skip, 
      filterBy,
      order,
      orderBy
    )

    return empresaList
  }

  async create(data:CreateEmpresaDTO):Promise<void> {
    const empresaAlreadyExists = await this.empresaRepository.findByCNPJ(data.cnpj)

    if (empresaAlreadyExists) {
      throw new Error('empresa already exists.')
    }

    const endereco = new Endereco(data.endereco)
    const empresa = new Empresa({...data, endereco, status: true})

    await this.empresaRepository.saveEmpresa(empresa)
  }

  async update(data:UpdateEmpresaDTO):Promise<void> {
    const empresaExists = await this.empresaRepository.findById(data.id_empresa)

    if (!empresaExists) {
      throw new Error('Empresa not found.')
    }

    await this.empresaRepository.updateEmpresa(data, data.endereco)
  }

  async changeStatus(id:string):Promise<void> {
    let empresaExists = await this.empresaRepository.findById(id)

    if (!empresaExists) {
      throw new Error('Empresa not found.')
    }

    empresaExists.status = !empresaExists.status

    await this.empresaRepository.updateEmpresaSimple(empresaExists)
  }
}
