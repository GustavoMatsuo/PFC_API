import { Response, Request } from "express"
import { IEntradaServices } from "src/interfaces/IEntradaServices"
import { ICreateEntradaDTO } from "@dto/EntradaDTO"

export class EntradaController {
  private entradaServices:IEntradaServices

  constructor(entradaServices:IEntradaServices) {
    this.entradaServices = entradaServices
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { produto, qtd, valor_unitario } = request.body
      const entrada:ICreateEntradaDTO = { produto, qtd, valor_unitario }

      await this.entradaServices.create(entrada)
  
      return response.status(201).json({msg: "entrada created"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const { limit, skip } = request.params
      const entradaList = await this.entradaServices.index(limit, skip)
  
      return response.status(200).json(entradaList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}