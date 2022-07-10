import { Response, Request } from "express"
import { ISaidaServices } from "@interfaces"
import { ICreateSaidaDTO } from "@dto/SaidaDTO"

export class SaidaController {
  private saidaServices:ISaidaServices

  constructor(saidaServices:ISaidaServices) {
    this.saidaServices = saidaServices
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { produto, qtd, valor_unitario } = request.body
      const saida:ICreateSaidaDTO = { produto, qtd, valor_unitario  }

      await this.saidaServices.create(saida)
  
      return response.status(201).json({msg: "saida created"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const { limit, skip } = request.query

      const saidaList = await this.saidaServices.index(String(limit), String(skip))
  
      return response.status(200).json(saidaList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}