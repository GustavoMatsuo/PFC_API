import { ICreateSaidaDTO } from "./SaidaDTO"

export type ICreateVendaDTO = {
  cliente:string
  saidas:ICreateSaidaDTO[]
  empresa:string
  usuario:string
}

export type ResponseVendasChart = {
  label:string[],
  data:number[]
}