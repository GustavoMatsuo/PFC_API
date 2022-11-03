import { Estoque } from "@models"

export class CreateProdutoDTO {
  nome:string
  codigo:string
  fornecedor:string
  valor_unitario:number
  desconto:number
  estoque_minimo:number
  categoria:string
  empresa:string
}

export class UpdateProdutoDTO {
  id_produto:string
  nome:string
  status:boolean
  codigo:string
  fornecedor:string
  valor_unitario:number
  desconto:number
  estoque_minimo:number
  categoria:string
  empresa:string
}

export class SimpleProdutoDTO {
  id_produto:string
  nome:string
  codigo:string
  valor_unitario:number
  desconto:number
  estoque:Estoque
}