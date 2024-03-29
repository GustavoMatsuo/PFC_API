import { Response, Request } from "express"
import { ICategoriaServices } from "@interfaces"
import { CreateCategoriaDTO, UpdateCategoriaDTO } from "@dto/CategoriaDTO"

export class CategoriaController {
  private categoriaServices:ICategoriaServices

  constructor(categoriaServices:ICategoriaServices) {
    this.categoriaServices = categoriaServices
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { nome, cor } = request.body
      const categoria:CreateCategoriaDTO = { nome, cor, empresa: request.empresaId }

      await this.categoriaServices.create(categoria)
  
      return response.status(201).json({msg: "categoria created"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async read(request:Request, response:Response):Promise<Response> {
    try {
      const { id } = request.query
      const formattedId = id? String(id):null

      const categoria = await this.categoriaServices.read(
        formattedId, 
        request.empresaId
      )

      return response.status(200).json(categoria)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async update(request:Request, response:Response):Promise<Response> {
    try {
      const { id_categoria, nome, cor, status } = request.body
      const categoria:UpdateCategoriaDTO = { 
        id_categoria, 
        nome, 
        cor,
        status,
        empresa: request.empresaId
      }

      await this.categoriaServices.update(categoria)
  
      return response.status(200).json({msg: "categoria updated"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async delete(request:Request, response:Response):Promise<Response> {
    try {
      const { id } = request.body
      const formattedId = id? String(id):null

      await this.categoriaServices.delete(formattedId, request.empresaId)
  
      return response.status(200).json({msg: "categoria deleted."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {

      const categoriaList = await this.categoriaServices.index(request.empresaId)
  
      return response.status(200).json(categoriaList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async simpleList(request:Request, response:Response):Promise<Response> {
    try {
      const categoriaList = await this.categoriaServices.simpleList(request.empresaId)
  
      return response.status(200).json(categoriaList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async changeStatus(request:Request, response:Response):Promise<Response> {
    try {
      const { id } = request.body

      await this.categoriaServices.changeStatus(id, request.empresaId)
  
      return response.status(200).json({msg: "categoria status update."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}