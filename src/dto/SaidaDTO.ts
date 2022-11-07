import { Produto } from "@models"

export class CreateSaidaDTO {
  produto:string
  qtd:number
  valor_unitario:number
  desconto?:number
  venda?:string
  empresa:string
}

export class VendaSaidaDTO {
  produto:Produto
  qtd:number
  valor_unitario:number
  desconto?:number
  venda?:string
  empresa:string
  data:Date
}