import { Entrada } from "@models"
import { IEntradaRepository } from "@interfaces"
import { Repository } from "typeorm"

export class EntradaRepository implements IEntradaRepository {
  private connection: Repository<Entrada>

  constructor(connection:Repository<Entrada>) {
    this.connection = connection
  }

  async listEntrada(
    empresa: string, 
    limitNum?: number, 
    skipNum?: number, 
    filterBy?: string, 
    order?: string, 
    orderBy?: string
  ): Promise<{ list: Entrada[]; total: number }> {
    const query = this.connection
      .createQueryBuilder("entrada")
      .leftJoinAndSelect("entrada.produto", "produto")
      .where("entrada.empresa_id = :empresa", { empresa })

    if(limitNum) query.take(limitNum)
    if(limitNum) query.skip(skipNum)

    if(filterBy) {
      query.where("LOWER(produto.nome) like LOWER(:nome)", { nome: `%${filterBy}%` })
    }

    if(order && orderBy) {
      const descOrAsc = String(order).toUpperCase() === "DESC"? "DESC":"ASC"
      query.orderBy(`entrada.${orderBy}`, descOrAsc)
    }

    const entradaList:Entrada[] = await query.getMany()
    const count = await query.getCount()

    return {list: entradaList, total: count}
  }

  async saveEntrada(entrada: Entrada): Promise<Entrada> {
    const result = this.connection.save(entrada)

    return result
  }
}