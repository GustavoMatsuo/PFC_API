import { Cliente } from "@models"
import { IClienteServices, IClienteRepository } from "@interfaces"
import { CreateClienteDTO, UpdateClienteDTO } from "@dto/ClienteDTO"

export class ClienteServices implements IClienteServices {
  private clienteRepository: IClienteRepository

  constructor(clienteRepository:IClienteRepository) {
    this.clienteRepository = clienteRepository
  }

  async create(data:CreateClienteDTO):Promise<Cliente> {
    const clienteAlreadyExists = await this.clienteRepository.findByCPF(
      data.cpf,
      data.empresa
    )

    if (clienteAlreadyExists) {
      throw new Error('Cliente already exists.')
    }
    const cliente = new Cliente({ ...data, empresa_id: data.empresa })

    const newCliente = await this.clienteRepository.saveCliente(cliente)

    return newCliente
  }

  async read(id:string, empresa: string):Promise<Cliente> {    
    const cliente = await this.clienteRepository.findById(id, empresa)

    if (!cliente) {
      throw new Error('Cliente not found.')
    }

    return cliente
  }

  async update(data:UpdateClienteDTO):Promise<boolean> {
    const clienteExists = await this.clienteRepository.findById(
      data.id_cliente,
      data.empresa
    )

    if (!clienteExists) {
      throw new Error('Cliente not found.')
    }

    const cliente = new Cliente({
      ...data, 
      empresa_id: data.empresa
    })

    return await this.clienteRepository.updateCliente(cliente)
  }

  async delete(id:string, empresa: string):Promise<boolean> {
    const clienteExists = await this.clienteRepository.findById(id, empresa)

    if (!clienteExists) {
      throw new Error('Cliente not found.')
    }

    return await this.clienteRepository.delete(id)
  }

  async index(empresa:string):Promise<Array<Cliente>> {
    const clienteList = await this.clienteRepository.listCliente(empresa)

    return clienteList
  }
}
