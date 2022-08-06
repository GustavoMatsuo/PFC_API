import { ICreateFornecedorDTO, IUpdateFornecedorDTO } from "@dto/FornecedorDTO"
import { Paginationlist } from "src/globalTypes"

export interface IFornecedorServices {
  index(
    limit?:string, 
    skip?:string, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
  create(data:ICreateFornecedorDTO):Promise<void>
  update(data:IUpdateFornecedorDTO):Promise<void>
  changeStatus(id:string):Promise<void>
  simpleList():Promise<Array<Object>>
}