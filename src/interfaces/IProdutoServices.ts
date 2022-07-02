import { ICreateProdutoDTO, IUpdateProdutoDTO } from "@dto/ProdutoDTO"
import { Produto } from "@models"

export interface IProdutoServices {
  index(limit?:string, skip?: string):Promise<Array<Produto>>
  create(data:ICreateProdutoDTO):Promise<void>
  update(data:IUpdateProdutoDTO):Promise<void>
  changeStatus(id:string):Promise<void>
  simpleList():Promise<Array<Object>>
}