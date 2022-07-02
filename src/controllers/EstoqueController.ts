import { Response, Request } from "express"
import { IEstoqueServices } from "src/interfaces/IEstoqueServices"

export class EstoqueController {
  private estoqueServices:IEstoqueServices

  constructor(estoqueServices:IEstoqueServices) {
    this.estoqueServices = estoqueServices
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const { limit, skip } = request.params
      const estoqueList = await this.estoqueServices.index(limit, skip)
  
      return response.status(200).json(estoqueList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}