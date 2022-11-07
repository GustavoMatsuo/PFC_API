import { Saida } from "@models"
import { ISaidaRepository } from "src/interfaces/Repositories/ISaidaRepository"
import { Repository } from "typeorm"

export class SaidaRepository implements ISaidaRepository {
  private connection: Repository<Saida>

  constructor(connection:Repository<Saida>) {
    this.connection = connection
  }

  async listSaida(
    empresa: string,
    limitNum?:number, 
    skipNum?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ): Promise<{list: Saida[], total: number}> {
    const query = this.connection
      .createQueryBuilder("saida")
      .leftJoinAndSelect("saida.venda", "venda")
      .leftJoinAndSelect("saida.produto", "produto")
      .where("saida.empresa_id = :empresa", { empresa })

    if(limitNum) query.take(limitNum)
    if(limitNum) query.skip(skipNum)

    if(filterBy) {
      query.where("LOWER(produto.nome) like LOWER(:nome)", { nome: `%${filterBy}%` })
    }

    if(order && orderBy) {
      const descOrAsc = String(order).toUpperCase() === "DESC"? "DESC":"ASC"
      query.orderBy(`saida.${orderBy}`, descOrAsc)
    }
    
    const saidaList = await query.getMany()

    const count = await query.getCount()
    
    return {list: saidaList, total: count}
  }

  async listRelatorio(inicio: string, fim: string, empresa: string): Promise<Saida[]> {
    let saidaList = await this.connection
      .createQueryBuilder("saida")
      .leftJoinAndSelect("saida.venda", "venda")
      .leftJoinAndSelect("saida.produto", "produto")
      .where(`saida.empresa_id = :empresa and saida.data_saida between '${inicio}' and '${fim}'`, { empresa })
      .getMany()
    
    return saidaList
  }

  async saveSaida(saida:Saida):Promise<Saida> {
    const result = this.connection.save(saida)

    return result
  }
}