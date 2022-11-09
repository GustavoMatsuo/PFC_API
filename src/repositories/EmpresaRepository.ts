import { Empresa, Endereco } from "@models"
import { IEmpresaRepository } from "@interfaces"
import { Repository } from "typeorm"

export class EmpresaRepository implements IEmpresaRepository {
  private connection: Repository<Empresa>

  constructor(connection:Repository<Empresa>) {
    this.connection = connection
  }

  async listEmpresa(
    limitNum?:number, 
    skipNum?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ): Promise<{list: Empresa[], total: number}> {
    const query = this.connection
      .createQueryBuilder("empresa")
      .leftJoinAndSelect("empresa.endereco", "endereco.id_endereco")

    if(limitNum) query.take(limitNum)
    if(limitNum) query.skip(skipNum)

    if(filterBy) {
      query.where("LOWER(empresa.nome) like LOWER(:nome)", { nome: `%${filterBy}%` })
    }

    if(order && orderBy) {
      const descOrAsc = String(order).toUpperCase() === "DESC"? "DESC":"ASC"
      query.orderBy(`empresa.${orderBy}`, descOrAsc)
    }

    const empresaList = await query.getMany()
    const count = await query.getCount()

    return {list: empresaList, total: count}
  }

  async findByCNPJ(cnpj: number): Promise<Empresa> {
    const result = await this.connection.findOneBy({
      cnpj: cnpj, 
    })

    return result
  }

  async findById(id: string): Promise<Empresa> {
    const result = await this.connection.findOneBy({
      id_empresa: id,
    })

    return result
  }

  async saveEmpresa(empresa: Empresa): Promise<Empresa> {
    const result = this.connection.save(empresa)

    return result
  }

  async updateEmpresa(empresa:Empresa, endereco:Endereco): Promise<boolean> {
    let result = false

    await this.connection.manager.transaction(async entityManager => { 
      await entityManager.update(Endereco, endereco.id_endereco, endereco)
      await entityManager.update(Empresa, empresa.id_empresa, empresa) 
      result = true
    })

    return result
  }

  async updateEmpresaSimple(empresa: Empresa): Promise<boolean> {
    const result = await this.connection.update(empresa.id_empresa, empresa)

    return result.affected === 1
  }
}