import { ICreateEntradaDTO } from "@dto/EntradaDTO"
import { Paginationlist } from "../globalTypes"

export interface IEntradaServices {
  create(data:ICreateEntradaDTO):Promise<void>
  index(
    empresa:string,
    limit?:string, 
    skip?:string, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
}