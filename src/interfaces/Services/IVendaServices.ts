import { CreateVendaDTO, ResponseVendasChart } from "@dto/VendaDTO"
import { Venda } from "@models"

export interface IVendaServices {
  create(data:CreateVendaDTO):Promise<void>
  index(empresa: string):Promise<Array<Venda>>
  getVendasChart(usuario:string, empresa: string):Promise<ResponseVendasChart>
}