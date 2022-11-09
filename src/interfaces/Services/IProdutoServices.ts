import { CreateProdutoDTO, UpdateProdutoDTO, SimpleProdutoDTO } from "@dto/ProdutoDTO"
import { Paginationlist } from "../../globalTypes"

export interface IProdutoServices {
  index(
    empresa:string,
    limit?:number, 
    skip?: number,
    name?:string,
    order?:string,
    tags?:string[]
  ):Promise<Paginationlist>
  create(data:CreateProdutoDTO):Promise<void>
  update(data:UpdateProdutoDTO):Promise<void>
  changeStatus(id:string, empresa:string):Promise<void>
  simpleList(empresa:string):Promise<Object[]>
}