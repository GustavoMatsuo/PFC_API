import { Response, Request } from "express"
import { IBasicCRUD } from '@interfaces'
import { ICreateCategoriaDTO, IUpdateCategoriaDTO } from "@dto/CategoriaDTO"

export class CategoriaController {
  private categoriaServices:IBasicCRUD

  constructor(categoriaServices:IBasicCRUD) {
    this.categoriaServices = categoriaServices
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { nome, cor } = request.body
      const categoria:ICreateCategoriaDTO = { nome, cor }

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
      const { id } = request.params
      const categoria = await this.categoriaServices.read(id)
  
      return response.status(200).json(categoria)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async update(request:Request, response:Response):Promise<Response> {
    try {
      const { id_categoria, nome, cor } = request.body
      const categoria:IUpdateCategoriaDTO = { id_categoria, nome, cor }

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

      await this.categoriaServices.delete(id)
  
      return response.status(200).json({msg: "categoria deleted."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const { limit, skip } = request.params
      const categoriaList = await this.categoriaServices.index(limit, skip)
  
      return response.status(200).json(categoriaList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}