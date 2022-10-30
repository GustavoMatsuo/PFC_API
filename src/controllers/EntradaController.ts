import { Response, Request } from "express"
import { IEntradaServices } from "@interfaces"
import { ICreateEntradaDTO } from "@dto/EntradaDTO"

export class EntradaController {
  private entradaServices:IEntradaServices

  constructor(entradaServices:IEntradaServices) {
    this.entradaServices = entradaServices
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { produto, qtd, valor_unitario } = request.body
      const entrada:ICreateEntradaDTO = {
        produto,
        qtd, 
        valor_unitario,
        empresa: request.empresaId
      }

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
      const { limit, skip, filterBy, order, orderBy } = request.query
      const formattedLimit = limit? String(limit) : null
      const formattedSkip = skip?  String(skip) : null
      const formattedFilterBy = filterBy? String(filterBy) : null
      const formattedOrder = order? String(order) : null
      const formattedOrderBy = orderBy?  String(orderBy) : null

      const entradaList = await this.entradaServices.index(
        request.empresaId,
        formattedLimit, 
        formattedSkip,
        formattedFilterBy,
        formattedOrder,
        formattedOrderBy
      )
  
      return response.status(200).json(entradaList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}