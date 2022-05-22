export interface ICreateProdutoDTO {
  nome:string
  fornecedor:string
  qtdEstoque:number
  estoqueMinimo:number
  categoria:string
}

export interface IUpdateProdutoDTO {
  id_produto:string
  nome:string
  status:boolean
  fornecedor:string
  qtdEstoque:number
  estoqueMinimo:number
  categoria:string
}