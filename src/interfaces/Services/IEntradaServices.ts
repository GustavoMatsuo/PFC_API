import { CreateEntradaDTO } from "@dto/EntradaDTO"
import { Paginationlist } from "../../globalTypes"

export interface IEntradaServices {
  create(data:CreateEntradaDTO):Promise<void>
  index(
    empresa:string,
    limit?:number, 
    skip?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
}