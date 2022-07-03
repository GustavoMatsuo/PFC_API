import { ICreateSaidaDTO } from "./SaidaDTO"

export interface ICreateVendaDTO {
  cliente:string
  saidas:ICreateSaidaDTO[]
}