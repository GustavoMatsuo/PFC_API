import { IBasicCRUD } from "./IBasicCRUD"

export interface IAnuncioServices extends IBasicCRUD {
  simpleList(empresa:string):Promise<Array<Object>>
}