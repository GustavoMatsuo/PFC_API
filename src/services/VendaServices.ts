import { Saida, Venda } from "@models"
import { IVendaServices } from "@interfaces"
import { VendaRepository } from "@repositories"
import { ICreateVendaDTO, ResponseVendasChart } from "@dto/VendaDTO"
import { db } from "@config/database"
import { Between } from "typeorm"

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
    const venda = new Venda({ 
      cliente, 
      data_venda: date,
      empresa: data.empresa,
      empresa_id: data.empresa,
      usuario: data.usuario,
      usuario_id: data.usuario
    })

    await db.manager.transaction(async entityManager => { 
      const savedVenda = await entityManager.save(Venda, venda)
      const idVenda = savedVenda.id_venda
      for(var item in saidas){
        const saida = new Saida({ 
          ...saidas[item], 
          venda: idVenda, 
          data_saida: date,
          empresa: data.empresa,
          empresa_id: data.empresa
        })
        await entityManager.save(Saida, saida)
      }
    })
  }

  async index(empresa:string):Promise<Array<Venda>> {
    const vendaList = await this.vendaRepository.findBy({empresa_id: empresa})

    return vendaList
  }

  async getVendasChart(usuario:string, empresa:string): Promise<ResponseVendasChart> {
    const today:Date = new Date()
    const six_month_ago:Date = new Date()
    six_month_ago.setMonth(today.getMonth() - 6)

    const vendaList = await this.vendaRepository.find({
      where: {
        usuario_id: usuario,
        empresa_id: empresa,
        data_venda: Between(
          six_month_ago,
          today
        )
      }
    })

    const label = []
    const data = []

    vendaList.map(item => {
      const currentMonth = item.data_venda.getMonth() + 1
      
      if(label.includes(currentMonth)) {
        const index = label.indexOf(currentMonth)
        data[index] = data[index] + 1
      } else {
        label.push(currentMonth)
        data.push(1)
      }
    })

    const chartData:ResponseVendasChart = {
      label: label,
      data: data
    }

    return chartData
  }
}
