import { Cliente } from "@models"
import { IBasicCRUD } from "./IBasicCRUD"

export interface IClienteServices extends Omit<IBasicCRUD, 'create'> {
  create(data:Object):Promise<Cliente>
}