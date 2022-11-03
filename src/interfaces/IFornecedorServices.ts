import { CreateFornecedorDTO, UpdateFornecedorDTO } from "@dto/FornecedorDTO"
import { Paginationlist } from "../globalTypes"

export interface IFornecedorServices {
  index(
    empresa:string,
    limit?:number, 
    skip?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
  create(data:CreateFornecedorDTO):Promise<void>
  update(data:UpdateFornecedorDTO):Promise<void>
  changeStatus(id:string, empresa:string):Promise<void>
  simpleList(empresa:string):Promise<Array<Object>>
}