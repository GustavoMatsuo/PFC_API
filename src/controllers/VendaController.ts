import { Response, Request } from "express"
import { IVendaServices } from "@interfaces"
import { ICreateVendaDTO } from "@dto/VendaDTO"

export class VendaController {
  private vendaServices:IVendaServices

  constructor(vendaServices:IVendaServices) {
    this.vendaServices = vendaServices
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { cliente, saidas } = request.body
      const venda:ICreateVendaDTO = { 
        cliente, 
        saidas, 
        empresa: request.empresaId,
        usuario: request.userId
      }

      await this.vendaServices.create(venda)
  
      return response.status(201).json({msg: "venda created"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const vendaList = await this.vendaServices.index(request.empresaId)
  
      return response.status(200).json(vendaList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async getVendasChart(request:Request, response:Response):Promise<Response> {
    try {
      const vendaList = await this.vendaServices.getVendasChart(
        request.userId, 
        request.empresaId
      )
  
      return response.status(200).json(vendaList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}