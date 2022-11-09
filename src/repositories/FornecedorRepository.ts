import { Endereco, Fornecedor } from "@models"
import { IFornecedorRepository } from "@interfaces"
import { Repository } from "typeorm"

export class FornecedorRepository implements IFornecedorRepository {
  private connection: Repository<Fornecedor>

  constructor(connection:Repository<Fornecedor>) {
    this.connection = connection
  }

  async listFornecedor(
    empresa:string,
    limitNum?: number, 
    skipNum?: number, 
    filterBy?: string, 
    order?: string, 
    orderBy?: string
  ): Promise<{ list: Fornecedor[]; total: number }> {
    const query = this.connection
      .createQueryBuilder("fornecedor")
      .leftJoinAndSelect("fornecedor.endereco", "endereco.id_endereco")
      .where("fornecedor.empresa_id = :empresa", { empresa })
    
    if(limitNum) query.take(limitNum)
    if(limitNum) query.skip(skipNum)

    if(filterBy) {
      query.andWhere("LOWER(fornecedor.nome) like LOWER(:nome)", { nome: `%${filterBy}%` })
    }

    if(order && orderBy) {
      const descOrAsc = String(order).toUpperCase() === "DESC"? "DESC":"ASC"
      query.orderBy(`fornecedor.${orderBy}`, descOrAsc)
    }

    const fornecedorList = await query.getMany()

    const count = await query.getCount()

    return {list: fornecedorList, total: count}
  }

  async simpleList(empresa:string):Promise<Array<Object>> {
    const fornecedorList = await this.connection
      .createQueryBuilder("fornecedor")
      .select("fornecedor.id_fornecedor")
      .addSelect("fornecedor.nome")
      .where("fornecedor.empresa_id = :empresa", { empresa })
      .getMany()

    return fornecedorList
  }

  async findByCNPJ(cnpj: number,  empresa:string): Promise<Fornecedor> {
    const result = await this.connection.findOneBy({
      cnpj: cnpj,
      empresa_id: empresa
    })

    return result
  }

  async findById(id: string, empresa: string): Promise<Fornecedor> {
    const result = await this.connection.findOneBy({
      id_fornecedor: id,
      empresa_id: empresa
    })

    return result
  }

  async saveFornecedor(fornecedor:Fornecedor):Promise<Fornecedor> {
    const result = this.connection.save(fornecedor)

    return result
  }

  async updateFornecedor(fornecedor: Fornecedor, endereco:Endereco): Promise<boolean> {
    let result = false

    await this.connection.manager.transaction(async entityManager => { 
      await entityManager.update(Endereco, endereco.id_endereco, endereco)
      await entityManager.update(Fornecedor, fornecedor.id_fornecedor, fornecedor) 
      result = true
    })

    return result
  }
}