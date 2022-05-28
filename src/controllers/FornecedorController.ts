import { Response, Request } from "express"
import { IFornecedorServices } from '@interfaces'
import { ICreateFornecedorDTO, IUpdateFornecedorDTO } from "@dto/FornecedorDTO"

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
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { nome, email, cnpj, endereco } = request.body
      const fornecedor:ICreateFornecedorDTO = {nome, email, cnpj, endereco}

      await this.fornecedorServices.create(fornecedor)
  
      return response.status(201).json({msg: "fornecedor created"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async update(request:Request, response:Response):Promise<Response> {
    try {
      const { id_fornecedor, nome, email, cnpj, status, endereco } = request.body
      const fornecedor:IUpdateFornecedorDTO = { id_fornecedor, nome, email, cnpj, status, endereco }

      await this.fornecedorServices.update(fornecedor)
  
      return response.status(200).json({msg: "fornecedor updated"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async changeStatus(request:Request, response:Response):Promise<Response> {
    try {
      const { id } = request.body

      await this.fornecedorServices.changeStatus(id)
  
      return response.status(200).json({msg: "fornecedor status update."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}