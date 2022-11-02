import { ICreateProdutoDTO, IUpdateProdutoDTO } from "@dto/ProdutoDTO"
import { Paginationlist } from "../globalTypes"

export type simpleProdutoType = {
  id_produto:string
  nome:string
  codigo:string
  valor_unitario:number
  desconto:number
  estoque:number
}

export interface IProdutoServices {
  index(
    empresa:string,
    limit?:string, 
    skip?: string,
    name?:string,
    order?:string,
    tags?:string[]
  ):Promise<Paginationlist>
  create(data:ICreateProdutoDTO):Promise<void>
  update(data:IUpdateProdutoDTO):Promise<void>
  changeStatus(id:string, empresa:string):Promise<void>
  simpleList(empresa:string):Promise<Array<Object>>
}