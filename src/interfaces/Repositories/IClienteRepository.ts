import { Cliente } from "@models"

export interface IClienteRepository {
  listCliente(empresa:string):Promise<Cliente[]>
  findByCPF(cpf:number, empresa:string):Promise<Cliente>
  findById(id:string, empresa:string):Promise<Cliente>
  saveCliente(cliente:Cliente):Promise<Cliente>
  updateCliente(cliente:Cliente):Promise<boolean>
  delete(id:String):Promise<boolean>
}