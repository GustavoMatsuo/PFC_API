import { Response, Request } from "express"
import { IAnuncioServices } from "src/interfaces/IAnuncioServices"
import { ICreateAnuncioDTO, IUpdateAnuncioDTO } from "@dto/AnuncioDTO"

export class AnuncioController {
  private anuncioServices:IAnuncioServices

  constructor(anuncioServices:IAnuncioServices) {
    this.anuncioServices = anuncioServices
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { titulo, texto } = request.body
      const anuncio:ICreateAnuncioDTO = { 
        titulo,
        texto,
        usuario: request.userId,
        empresa: request.empresaId 
      }

      await this.anuncioServices.create(anuncio)
  
      return response.status(201).json({msg: "anuncio created"})
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

      const anuncio = await this.anuncioServices.read(
        formattedId, 
        request.empresaId
      )

      return response.status(200).json(anuncio)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async update(request:Request, response:Response):Promise<Response> {
    try {
      const { id_anuncio, titulo, texto } = request.body
      const anuncio:IUpdateAnuncioDTO = {
        id_anuncio,
        titulo,
        texto,
        empresa: request.empresaId,
        usuario: request.userId
      }

      await this.anuncioServices.update(anuncio)
  
      return response.status(200).json({msg: "anuncio updated"})
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

      await this.anuncioServices.delete(formattedId, request.empresaId)
  
      return response.status(200).json({msg: "anuncio deleted."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {

      const anuncioList = await this.anuncioServices.index(request.empresaId)
  
      return response.status(200).json(anuncioList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async simpleList(request:Request, response:Response):Promise<Response> {
    try {
      const anuncioList = await this.anuncioServices.simpleList(request.empresaId)
  
      return response.status(200).json(anuncioList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}