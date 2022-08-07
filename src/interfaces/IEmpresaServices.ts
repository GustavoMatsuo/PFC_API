import { ICreateEmpresaDTO, IUpdateEmpresaDTO } from "@dto/EmpresaDTO"
import { Paginationlist } from "src/globalTypes"

export interface IEmpresaServices {
  index(
    limit?:string, 
    skip?:string, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
  create(data:ICreateEmpresaDTO):Promise<void>
  update(data:IUpdateEmpresaDTO):Promise<void>
  changeStatus(id:string):Promise<void>
}