import { ICreateSaidaDTO } from "@dto/SaidaDTO"
import { Saida } from "@models"

export interface ISaidaServices {
  create(data:ICreateSaidaDTO):Promise<void>
  index(limit?:string, skip?:string):Promise<Array<Saida>>
}