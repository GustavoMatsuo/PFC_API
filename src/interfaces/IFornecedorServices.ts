import { ICreateFornecedorDTO, IUpdateFornecedorDTO } from "@dto/FornecedorDTO"
import { Paginationlist } from "../globalTypes"

export interface IFornecedorServices {
  index(
    empresa:string,
    limit?:string, 
    skip?:string, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
  create(data:ICreateFornecedorDTO):Promise<void>
  update(data:IUpdateFornecedorDTO):Promise<void>
  changeStatus(id:string, empresa:string):Promise<void>
  simpleList(empresa:string):Promise<Array<Object>>
}