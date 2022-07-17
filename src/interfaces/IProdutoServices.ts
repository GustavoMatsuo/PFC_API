import { ICreateProdutoDTO, IUpdateProdutoDTO } from "@dto/ProdutoDTO"
import { Paginationlist } from "src/globalTypes"

export interface IProdutoServices {
  index(limit?:string, skip?: string):Promise<Paginationlist>
  create(data:ICreateProdutoDTO):Promise<void>
  update(data:IUpdateProdutoDTO):Promise<void>
  changeStatus(id:string):Promise<void>
  simpleList():Promise<Array<Object>>
}