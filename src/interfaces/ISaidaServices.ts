import { ICreateSaidaDTO } from "@dto/SaidaDTO"
import { Paginationlist } from "src/globalTypes"

export interface ISaidaServices {
  create(data:ICreateSaidaDTO):Promise<void>
  index(
    empresa:string,
    limit?:string, 
    skip?:string, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
}