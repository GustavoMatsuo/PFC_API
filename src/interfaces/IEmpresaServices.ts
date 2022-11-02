import { CreateEmpresaDTO, UpdateEmpresaDTO } from "@dto/EmpresaDTO"
import { Paginationlist } from "../globalTypes"

export interface IEmpresaServices {
  index(
    limit?:number, 
    skip?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
  create(data:CreateEmpresaDTO):Promise<void>
  update(data:UpdateEmpresaDTO):Promise<void>
  changeStatus(id:string):Promise<void>
}