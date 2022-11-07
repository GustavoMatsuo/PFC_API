import { Venda } from "@models"
import { IVendaServices } from "@interfaces"
import { CreateVendaDTO, ResponseVendasChart } from "@dto/VendaDTO"
import { fDateMonthYear } from "../utils/formatTime"
import { subMonths, startOfMonth } from 'date-fns'
import { IVendaRepository } from "src/interfaces/Repositories/IVendaRepository"
import { IProdutoRepository } from "src/interfaces/Repositories/IProdutoRepository"
import { IClienteRepository } from "src/interfaces/Repositories/IClienteRepository"
import { VendaSaidaDTO } from "@dto/SaidaDTO"

export class VendaServices implements IVendaServices {
  private vendaRepository:IVendaRepository
  private produtoRepository:IProdutoRepository
  private clienteRepository:IClienteRepository

  constructor(
    vendaRepository:IVendaRepository,
    produtoRepository:IProdutoRepository,
    clienteRepository:IClienteRepository
  ) {
    this.vendaRepository = vendaRepository
    this.produtoRepository = produtoRepository,
    this.clienteRepository = clienteRepository
  }

  async create(data:CreateVendaDTO):Promise<void> {
    const { cliente, saidas } = data 

    if(!saidas || saidas.length < 1) {
      throw new Error('Venda is empty.')
    }

    if(!cliente) {
      throw new Error('Cliente is empty.')
    }

    const existeCliente = await this.clienteRepository.findById(cliente, data.empresa)

    if(!existeCliente) {
      throw new Error('Cliente not found.')
    }

    const date = new Date()

    const venda = new Venda({ 
      cliente: existeCliente, 
      data_venda: date,
      empresa_id: data.empresa,
      usuario_id: data.usuario
    })

    const vendaSaida = []
    saidas.forEach(async(item) => {
      const produto = await this.produtoRepository.findById(
        item.produto, 
        data.empresa
      )

      const saida:VendaSaidaDTO = { 
        ...item, 
        produto: produto,
        desconto: item.desconto,
        empresa: data.empresa,
        data: date
      }

      vendaSaida.push(saida)
    })

    this.vendaRepository.saveVenda(venda, vendaSaida)
  }

  async index(empresa:string):Promise<Array<Venda>> {
    const vendaList = await this.vendaRepository.listVenda(empresa)

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

    const vendaList = await this.vendaRepository.findBetweenDate(
      usuario,
      empresa,
      six_month_ago,
      today
    )

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