import { ICreateEntradaDTO } from "@dto/EntradaDTO"
import { Entrada } from "src/models/Entrada"

export interface IEntradaServices {
  create(data:ICreateEntradaDTO):Promise<void>
  index(limit?:string, skip?:string):Promise<Array<Entrada>>
}