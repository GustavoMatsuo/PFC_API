export interface ICreateEntradaDTO {
  produto:string
  qtd:number
  valor_unitario:number
}

export interface IEntradaFormattedDTO {
  id_entrada:string
  id_produto:string
  nome_produto:string
  qtd:number
  data_entrada:Date
  valor_unitario:number
}