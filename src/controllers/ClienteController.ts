import { Response, Request } from "express"
import { IClienteServices } from "src/interfaces/IClienteServices"
import { ICreateClienteDTO, IUpdateClienteDTO } from "@dto/ClienteDTO"

export class ClienteController {
  private clienteServices:IClienteServices

  constructor(clienteServices:IClienteServices) {
    this.clienteServices = clienteServices
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { nome, cpf, cel  } = request.body
      const cliente:ICreateClienteDTO = { nome, cpf, cel }

      const newCliente = await this.clienteServices.create(cliente)
  
      return response.status(201).json({cliente: newCliente, msg: "cliente created"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async read(request:Request, response:Response):Promise<Response> {
    try {
      const { id } = request.query      
      const cliente = await this.clienteServices.read(String(id))
  
      return response.status(200).json(cliente)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async update(request:Request, response:Response):Promise<Response> {
    try {
      const { id_cliente, nome, cpf, cel } = request.body
      const cliente:IUpdateClienteDTO = { id_cliente, nome, cpf, cel }

      await this.clienteServices.update(cliente)
  
      return response.status(200).json({msg: "cliente updated"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async delete(request:Request, response:Response):Promise<Response> {
    try {
      const { id } = request.body

      await this.clienteServices.delete(id)
  
      return response.status(200).json({msg: "cliente deleted."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const clienteList = await this.clienteServices.index()
  
      return response.status(200).json(clienteList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}