import { IBasicCRUD } from "./IBasicCRUD"

export interface ICategoriaServices extends IBasicCRUD {
  simpleList():Promise<Array<Object>>
}