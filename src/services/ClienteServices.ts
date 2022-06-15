import { Cliente } from "@models"
import { IClienteServices } from "@interfaces"
import { ClienteRepository } from "@repositories"
import { ICreateClienteDTO, IUpdateClienteDTO } from "@dto/ClienteDTO"

export class ClienteServices implements IClienteServices {
  private clienteRepository: ClienteRepository

  constructor(clienteRepository:ClienteRepository) {
    this.clienteRepository = clienteRepository
  }

  async create(data:ICreateClienteDTO):Promise<void> {
    const clienteAlreadyExists = await this.clienteRepository.findOneBy({
      cpf: data.cpf
    })

    if (clienteAlreadyExists) {
      throw new Error('Cliente already exists.')
    }
    const cliente = new Cliente({ ...data })

    await this.clienteRepository.save(cliente)
  }

  async read(id:string):Promise<Cliente> {    
    const cliente = await this.clienteRepository.findOneBy({
      id_cliente: id
    })

    return cliente
  }

  async update(data:IUpdateClienteDTO):Promise<void> {
    const clienteExists = await this.clienteRepository.findOneBy({
      id_cliente: data.id_cliente
    })

    if (!clienteExists) {
      throw new Error('Cliente not found.')
    }

    await this.clienteRepository.update(data.id_cliente, data)
  }

  async delete(id:string):Promise<void> {
    const clienteExists = await this.clienteRepository.findBy({id_cliente: id})

    if (!clienteExists) {
      throw new Error('Cliente not found.')
    }

    await this.clienteRepository.delete(id)
  }

  async index(limit:string, skip:string):Promise<Array<Cliente>> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const clienteList = await this.clienteRepository.find({
      take: limitNum,
      skip: skipNum
    })

    return clienteList
  }
}
