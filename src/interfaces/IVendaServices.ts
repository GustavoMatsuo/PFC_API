import { ICreateVendaDTO, ResponseVendasChart } from "@dto/VendaDTO"
import { Venda } from "@models"

export interface IVendaServices {
  create(data:ICreateVendaDTO):Promise<void>
  index(empresa: string):Promise<Array<Venda>>
  getVendasChart(usuario:string, empresa: string):Promise<ResponseVendasChart>
}