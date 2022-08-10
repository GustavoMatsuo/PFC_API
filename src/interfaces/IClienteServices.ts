import { ICreateClienteDTO, IUpdateClienteDTO } from "@dto/ClienteDTO"
import { Cliente } from "@models"
import { IBasicCRUD } from "./IBasicCRUD"

export interface IClienteServices extends Omit<IBasicCRUD, 'create'> {
  create(data:ICreateClienteDTO):Promise<Cliente>
  update(data:IUpdateClienteDTO):Promise<void>
}