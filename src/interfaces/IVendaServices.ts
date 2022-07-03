import { ICreateVendaDTO } from "@dto/VendaDTO"
import { Venda } from "@models"

export interface IVendaServices {
  create(data:ICreateVendaDTO):Promise<void>
  index(limit?:string, skip?:string):Promise<Array<Venda>>
}