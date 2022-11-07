import { VendaSaidaDTO } from "@dto/SaidaDTO"
import { Saida, Venda } from "@models"
import { IVendaRepository } from "src/interfaces/Repositories/IVendaRepository"
import { Between, Repository } from "typeorm"

export class VendaRepository implements IVendaRepository {
  private connection: Repository<Venda>

  constructor(connection:Repository<Venda>) {
    this.connection = connection
  }

  async listVenda(empresa: string): Promise<Venda[]> {
    const result = await this.connection.findBy({
      empresa_id: empresa
    })

    return result
  }

  async findById(id: string, empresa:string): Promise<Venda> {
    const result = await this.connection.findOneBy({
      id_venda: id,
      empresa_id: empresa
    })

    return result
  }

  async findBetweenDate(
    usuario: string, 
    empresa: string, 
    initialDate: Date, 
    finalDate: Date
  ): Promise<Venda[]> {
    const vendaList = await this.connection.find({
      where: {
        usuario_id: usuario,
        empresa_id: empresa,
        data_venda: Between(
          initialDate,
          finalDate
        )
      }
    })

    return vendaList
  }

  async saveVenda(venda: Venda, saidas:VendaSaidaDTO[]): Promise<Venda> {
    let savedVenda = null

    await this.connection.manager.transaction(async entityManager => { 
      savedVenda = await entityManager.save(Venda, venda)

      const idVenda = savedVenda.id_venda
      
      for(var item in saidas){
        const saida = new Saida({ 
          ...saidas[item], 
          venda: idVenda, 
          data_saida: saidas[item].data,
          desconto: saidas[item].desconto,
          empresa_id: saidas[item].empresa
        })
        await entityManager.save(Saida, saida)
      }
    })

    return savedVenda
  }
}