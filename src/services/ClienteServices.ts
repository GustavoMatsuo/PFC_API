import { Cliente } from "@models"
import { IClienteServices } from "@interfaces"
import { ClienteRepository } from "@repositories"
import { ICreateClienteDTO, IUpdateClienteDTO } from "@dto/ClienteDTO"

export class ClienteServices implements IClienteServices {
  private clienteRepository: ClienteRepository

  constructor(clienteRepository:ClienteRepository) {
    this.clienteRepository = clienteRepository
  }

  async create(data:ICreateClienteDTO):Promise<Cliente> {
    const clienteAlreadyExists = await this.clienteRepository.findOneBy({
      cpf: data.cpf,
      empresa_id: data.empresa
    })

    if (clienteAlreadyExists) {
      throw new Error('Cliente already exists.')
    }
    const cliente = new Cliente({ ...data, empresa_id: data.empresa })

    const newCliente = await this.clienteRepository.save(cliente)

    return newCliente
  }

  async read(id:string, empresa: string):Promise<Cliente> {    
    const cliente = await this.clienteRepository.findOneBy({
      id_cliente: id,
      empresa_id: empresa
    })

    return cliente
  }

  async update(data:IUpdateClienteDTO):Promise<void> {
    const clienteExists = await this.clienteRepository.findOneBy({
      id_cliente: data.id_cliente,
      empresa_id: data.empresa
    })

    if (!clienteExists) {
      throw new Error('Cliente not found.')
    }


    await this.clienteRepository.update(
      data.id_cliente, 
      {
        ...data,
        empresa_id: data.empresa
      }
    )
  }

  async delete(id:string, empresa: string):Promise<void> {
    const clienteExists = await this.clienteRepository.findOneBy({
      id_cliente: id,
      empresa_id: empresa
    })

    if (!clienteExists) {
      throw new Error('Cliente not found.')
    }

    await this.clienteRepository.delete(id)
  }

  async index(empresa:string):Promise<Array<Cliente>> {
    const clienteList = await this.clienteRepository.findBy({
      empresa_id: empresa
    })

    return clienteList
  }
}
