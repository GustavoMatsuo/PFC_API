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
      const { limit, skip, filterBy } = request.query
      const formattedLimit = limit? String(limit) : null
      const formattedSkip = skip?  String(skip) : null
      const formattedFilterBy = filterBy? String(filterBy) : null
      
      const saidaList = await this.saidaServices.index(
        formattedLimit, 
        formattedSkip,
        formattedFilterBy
      )
  
      return response.status(200).json(saidaList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}