export interface ICreateProdutoDTO {
  nome:string
  codigo:string
  fornecedor:string
  valor_unitario:number
  estoque_minimo:number
  categoria:string
}

export interface IUpdateProdutoDTO {
  id_produto:string
  nome:string
  status:boolean
  codigo:string
  fornecedor:string
  valor_unitario:number
  estoque_minimo:number
  categoria:string
}