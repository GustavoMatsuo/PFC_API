import { Cliente } from "@models"
import { IClienteRepository } from "src/interfaces/Repositories/IClienteRepository"
import { Repository } from "typeorm"

export class ClienteRepository implements IClienteRepository {
  private connection: Repository<Cliente>

  constructor(connection:Repository<Cliente>) {
    this.connection = connection
  }

  async listCliente(empresa:string): Promise<Cliente[]> {
    const result = this.connection.findBy({
      empresa_id: empresa
    })

    return result
  }

  async findByCPF(cpf:number, empresa:string): Promise<Cliente> {
    const result = this.connection.findOneBy({
      cpf: cpf, 
      empresa_id: empresa
    })

    return result
  }

  async findById(id:string, empresa:string): Promise<Cliente> {
    const result = await this.connection.findOneBy({
      id_cliente: id,
      empresa_id: empresa
    })

    return result
  }

  async saveCliente(cliente:Cliente):Promise<Cliente> {
    const result = this.connection.save(cliente)

    return result
  }

  async updateCliente(cleinte:Cliente):Promise<boolean> {
    const result = await this.connection.update(cleinte.id_cliente, cleinte)

    return result.affected === 1
  }

  async delete(id:string): Promise<boolean> {
    const result = await this.connection.delete(id)

    return result.affected === 1
  }
}