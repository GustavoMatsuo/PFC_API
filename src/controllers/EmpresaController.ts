import { Response, Request } from "express"
import { IEmpresaServices } from '@interfaces'
import { CreateEmpresaDTO, UpdateEmpresaDTO } from "@dto/EmpresaDTO"

export class EmpresaController {
  private empresaServices:IEmpresaServices

  constructor(empresaServices:IEmpresaServices) {
    this.empresaServices = empresaServices
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const { limit, skip, filterBy, order, orderBy } = request.query
      const formattedLimit = limit? Number(limit) : null
      const formattedSkip = skip?  Number(skip) : null
      const formattedFilterBy = filterBy? String(filterBy) : null
      const formattedOrder = order? String(order) : null
      const formattedOrderBy = orderBy?  String(orderBy) : null
      
      const empresaList = await this.empresaServices.index(
        formattedLimit, 
        formattedSkip,
        formattedFilterBy,
        formattedOrder,
        formattedOrderBy
      )
  
      return response.status(200).json(empresaList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { nome, email, cel, cnpj, endereco } = request.body
      const empresa:CreateEmpresaDTO = {nome, email, cel, cnpj, endereco}

      await this.empresaServices.create(empresa)
  
      return response.status(201).json({msg: "empresa created"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async update(request:Request, response:Response):Promise<Response> {
    try {
      const { id_empresa, nome, email, cel, cnpj, status, endereco } = request.body
      const empresa:UpdateEmpresaDTO = { id_empresa, nome, email, cel, cnpj, status, endereco }

      await this.empresaServices.update(empresa)
  
      return response.status(200).json({msg: "empresa updated"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async changeStatus(request:Request, response:Response):Promise<Response> {
    try {
      const { id } = request.body

      await this.empresaServices.changeStatus(id)
  
      return response.status(200).json({msg: "empresa status update."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}