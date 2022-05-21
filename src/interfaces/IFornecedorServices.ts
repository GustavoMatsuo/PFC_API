import { Fornecedor } from "@models"

export interface IFornecedorServices {
  index(limit?:string, skip?: string):Promise<Array<Fornecedor>>

}