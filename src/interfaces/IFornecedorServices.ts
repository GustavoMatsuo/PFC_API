import { ICreateFornecedorDTO, IUpdateFornecedorDTO } from "@dto/FornecedorDTO"
import { Fornecedor } from "@models"

export interface IFornecedorServices {
  index(limit?:string, skip?: string):Promise<Array<Fornecedor>>
  create(data:ICreateFornecedorDTO):Promise<void>
  update(data:IUpdateFornecedorDTO):Promise<void>
  changeStatus(id:string):Promise<void>
  simpleList():Promise<Array<Object>>
}