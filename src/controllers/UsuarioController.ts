import { Response, Request } from "express"
import { IUsuarioServices } from '@interfaces'
import { ICreateUsuarioDTO, ILoginUsuarioDTO, IUpdateUsuarioDTO } from "@dto/UsuarioDTO"

export class UsuarioController {
  private usuarioServices:IUsuarioServices

  constructor(usuarioServices:IUsuarioServices) {
    this.usuarioServices = usuarioServices
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const { limit, skip, filterBy } = request.query
      const formattedLimit = limit? String(limit) : null
      const formattedSkip = skip?  String(skip) : null
      const formattedFilterBy = filterBy? String(filterBy) : null

      const usuarioList = await this.usuarioServices.index(
        formattedLimit, 
        formattedSkip,
        formattedFilterBy
      )
  
      return response.status(200).json(usuarioList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async login(request:Request, response:Response):Promise<Response> {
    try {
      const { email, senha } = request.body
      const usuarioData:ILoginUsuarioDTO = {email, senha}

      const usuario = await this.usuarioServices.login(usuarioData)

      if(usuario){
        return response.status(200).json(usuario)
      }else{
        return response.status(401).json({
          msg: 'Email ou senha incorreto!'
        })
      }
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { nome, email, cargo, senha } = request.body
      const usuario:ICreateUsuarioDTO = {nome, email, cargo, senha}

      await this.usuarioServices.create(usuario)
  
      return response.status(201).json({msg: "usuario created"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async update(request:Request, response:Response):Promise<Response> {
    try {
      const { id_usuario, nome, status, email, cargo, senha } = request.body
      const usuario:IUpdateUsuarioDTO = {id_usuario, nome, status, email, cargo, senha}

      await this.usuarioServices.update(usuario)
  
      return response.status(200).json({msg: "usuario updated"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async delete(request:Request, response:Response):Promise<Response> {    
    try {
      const { id } = request.body

      await this.usuarioServices.delete(id)
  
      return response.status(200).json({msg: "usuario deleted"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async changeStatus(request:Request, response:Response):Promise<Response> {
    try {
      const { id } = request.body

      await this.usuarioServices.changeStatus(id)
  
      return response.status(200).json({msg: "usuario status update."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async reset(request:Request, response:Response):Promise<Response> {
    try {
      const { email } = request.body

      await this.usuarioServices.reset(email)

      return response.status(200).json({msg: 'email sended'})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
  async newPassword(request:Request, response:Response):Promise<Response> {
    try {
      const { senha } = request.body

      await this.usuarioServices.newPassword(senha, request.userId)

      return response.status(200).json({msg: 'password changed'})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}