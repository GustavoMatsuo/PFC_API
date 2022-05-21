import { Response, Request } from "express"
import { IFornecedorServices } from '@interfaces'

export class FornecedorController {
  private fornecedorServices:IFornecedorServices

  constructor(fornecedorServices:IFornecedorServices) {
    this.fornecedorServices = fornecedorServices
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const { limit, skip } = request.params
      const fornecedorList = await this.fornecedorServices.index(limit, skip)
  
      return response.status(200).json(fornecedorList)
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}