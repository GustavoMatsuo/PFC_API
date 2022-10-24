import { Saida, Venda } from "@models"
import { IVendaServices } from "@interfaces"
import { VendaRepository } from "@repositories"
import { ICreateVendaDTO, ResponseVendasChart } from "@dto/VendaDTO"
import { db } from "src/config/database"
import { Between } from "typeorm"
import { subMonths, startOfMonth } from 'date-fns'
import { fDateMonthYear } from "src/utils/formatTime"

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
          desconto: saidas[item].desconto,
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
    const six_month_ago:Date = subMonths(startOfMonth(today), 5)
  
    const data = [0,0,0,0,0,0]
    const label:string[] = [
      fDateMonthYear(six_month_ago),    
      fDateMonthYear(subMonths(today, 4)),
      fDateMonthYear(subMonths(today, 3)),
      fDateMonthYear(subMonths(today, 2)),
      fDateMonthYear(subMonths(today, 1)),
      fDateMonthYear(today),
    ]

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

    vendaList.map(item => {
      const currentMonth = fDateMonthYear(item.data_venda)
      const index = label.indexOf(currentMonth)
      data[index] = data[index] + 1
    })

    const chartData:ResponseVendasChart = {
      label: label,
      data: data
    }

    return chartData
  }
}