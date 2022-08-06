import { ICreateEntradaDTO } from "@dto/EntradaDTO"
import { Paginationlist } from "src/globalTypes"

export interface IEntradaServices {
  create(data:ICreateEntradaDTO):Promise<void>
  index(
    limit?:string, 
    skip?:string, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
}