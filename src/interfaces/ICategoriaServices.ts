import { IBasicCRUD } from "./IBasicCRUD"

export interface ICategoriaServices extends IBasicCRUD {
  simpleList(empresa:string):Promise<Array<Object>>
  changeStatus(id:string, empresa:string):Promise<void>
}