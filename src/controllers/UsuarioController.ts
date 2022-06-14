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
      const { limit, skip } = request.params
      const usuarioList = await this.usuarioServices.index(limit, skip)
  
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
}