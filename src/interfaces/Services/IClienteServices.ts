import { CreateClienteDTO, UpdateClienteDTO } from "@dto/ClienteDTO"
import { Cliente } from "@models"
import { IBasicCRUD } from "./IBasicCRUD"

export interface IClienteServices extends Omit<IBasicCRUD, 'create'> {
  create(data:CreateClienteDTO):Promise<Cliente>
  update(data:UpdateClienteDTO):Promise<boolean>
}