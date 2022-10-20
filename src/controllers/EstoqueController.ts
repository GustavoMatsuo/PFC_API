import { Response, Request } from "express"
import { IEstoqueServices } from "src/interfaces/IEstoqueServices"

export class EstoqueController {
  private estoqueServices:IEstoqueServices

  constructor(estoqueServices:IEstoqueServices) {
    this.estoqueServices = estoqueServices
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const estoqueList = await this.estoqueServices.index()
  
      return response.status(200).json(estoqueList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async getInventario(request:Request, response:Response):Promise<Response> {
    try {
      const workbook = await this.estoqueServices.getInventario(request.empresaId)
    
      await workbook.xlsx.write(response)

      return response.status(200).end()
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async getDaily(request:Request, response:Response):Promise<Response> {
    try {
      const workbook = await this.estoqueServices.getDaily(request.empresaId)
    
      await workbook.xlsx.write(response)

      return response.status(200).end()
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async getEstoqueMinimo(request:Request, response:Response):Promise<Response> {
    try {
      const workbook = await this.estoqueServices.getEstoqueMinimo(request.empresaId)
    
      await workbook.xlsx.write(response)

      return response.status(200).end()
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}