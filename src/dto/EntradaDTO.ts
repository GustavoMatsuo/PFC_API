export class CreateEntradaDTO {
  produto:string
  qtd:number
  valor_unitario:number
  empresa:string
}

export class EntradaFormattedDTO {
  id_entrada:string
  id_produto:string
  nome_produto:string
  qtd:number
  data_entrada:Date
  valor_unitario:number
}