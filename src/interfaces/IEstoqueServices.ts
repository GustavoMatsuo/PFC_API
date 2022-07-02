import { Estoque } from "src/models/Estoque"

export interface IEstoqueServices {
  index(limit?:string, skip?:string):Promise<Array<Estoque>>
}