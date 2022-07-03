import { Saida, Venda } from "@models"
import { IVendaServices } from "@interfaces"
import { VendaRepository } from "@repositories"
import { ICreateVendaDTO } from "@dto/VendaDTO"
import { db } from "@config/database"

export class VendaServices implements IVendaServices {
  private vendaRepository: VendaRepository

  constructor(vendaRepository:VendaRepository) {
    this.vendaRepository = vendaRepository
  }

  async create(data:ICreateVendaDTO):Promise<void> {
    const { cliente, saidas } = data 

    if(!saidas || saidas.length < 1) {
      throw new Error('Venda is empty.')
    }

    if(!cliente) {
      throw new Error('Cliente is empty.')
    }

    const date = new Date()
    const venda = new Venda({ cliente, data_venda: date })

    await db.manager.transaction(async entityManager => { 
      const savedVenda = await entityManager.save(venda)
      const idVenda = savedVenda.id_venda
      for(var item in saidas){
        const saida = new Saida({ ...saidas[item], venda: idVenda, data_saida: date })
        await entityManager.save(saida)
      }
    })
  }

  async index(limit:string, skip:string):Promise<Array<Venda>> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const vendaList = await this.vendaRepository.find({
      take: limitNum,
      skip: skipNum
    })

    return vendaList
  }
}
