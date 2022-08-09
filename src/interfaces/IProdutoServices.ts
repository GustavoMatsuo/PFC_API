import { ICreateProdutoDTO, IUpdateProdutoDTO } from "@dto/ProdutoDTO"
import { Paginationlist } from "src/globalTypes"

export interface IProdutoServices {
  index(
    empresa:string,
    limit?:string, 
    skip?: string
  ):Promise<Paginationlist>
  create(data:ICreateProdutoDTO):Promise<void>
  update(data:IUpdateProdutoDTO):Promise<void>
  changeStatus(id:string, empresa:string):Promise<void>
  simpleList(empresa:string):Promise<Array<Object>>
}