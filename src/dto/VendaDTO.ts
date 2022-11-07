import { CreateSaidaDTO } from "./SaidaDTO"

export type CreateVendaDTO = {
  cliente:string
  saidas:CreateSaidaDTO[]
  empresa:string
  usuario:string
}

export type ResponseVendasChart = {
  label:string[],
  data:number[]
}