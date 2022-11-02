import { Response, Request } from "express"
import { IClienteServices } from "@interfaces"
import { CreateClienteDTO, UpdateClienteDTO } from "@dto/ClienteDTO"

export class ClienteController {
  private clienteServices:IClienteServices

  constructor(clienteServices:IClienteServices) {
    this.clienteServices = clienteServices
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { nome, cpf, cel } = request.body
      const cliente:CreateClienteDTO = { 
        nome, 
        cpf, 
        cel,
        empresa: request.empresaId
      }

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
      const formattedId = id? String(id):null

      const cliente = await this.clienteServices.read(formattedId, request.empresaId)
  
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
      const cliente:UpdateClienteDTO = { 
        id_cliente,
        nome,
        cpf,
        cel,
        empresa: request.empresaId
      }

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

      await this.clienteServices.delete(id, request.empresaId)
  
      return response.status(200).json({msg: "cliente deleted."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const clienteList = await this.clienteServices.index(request.empresaId)
  
      return response.status(200).json(clienteList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}