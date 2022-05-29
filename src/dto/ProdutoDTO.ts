export interface ICreateProdutoDTO {
  nome:string
  fornecedor:string
  valorUnitario:number
  qtdEstoque:number
  estoqueMinimo:number
  categoria:string
}

export interface IUpdateProdutoDTO {
  id_produto:string
  nome:string
  status:boolean
  fornecedor:string
  valorUnitario:number
  qtdEstoque:number
  estoqueMinimo:number
  categoria:string
}