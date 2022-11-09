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
      const { limit, skip, filterBy, order, orderBy } = request.query
      const formattedLimit = limit? Number(limit) : null
      const formattedSkip = skip?  Number(skip) : null
      const formattedFilterBy = filterBy? String(filterBy) : null
      const formattedOrder = order? String(order) : null
      const formattedOrderBy = orderBy?  String(orderBy) : null

      const usuarioList = await this.usuarioServices.index(
        request.empresaId,
        formattedLimit,
        formattedSkip,
        formattedFilterBy,
        formattedOrder,
        formattedOrderBy
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
      const usuario:ICreateUsuarioDTO = {
        nome, 
        email, 
        cargo, 
        senha,
        empresa: request.empresaId
      }

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
      const { id_usuario, nome, status, email, cargo, senha, verificado } = request.body
      const usuario:IUpdateUsuarioDTO = {
        id_usuario, 
        nome, 
        status, 
        email, 
        cargo, 
        senha,
        empresa: request.empresaId,
        verificado
      }

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
      const { id } = request.query

      const formattedId = id? String(id) : null

      await this.usuarioServices.delete(formattedId, request.empresaId)
  
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

      await this.usuarioServices.changeStatus(id, request.empresaId)
  
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

      await this.usuarioServices.newPassword(
        senha, 
        request.userId, 
        request.empresaId
      )

      return response.status(200).json({msg: 'password changed'})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async firstUsuario(request:Request, response:Response):Promise<Response> {
    try {
      const { nome, email, cargo, senha, empresa } = request.body
      const usuario:ICreateUsuarioDTO = {nome, email, cargo, senha, empresa}

      await this.usuarioServices.create(usuario)
  
      return response.status(201).json({msg: "usuario created"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async listByAdm(request:Request, response:Response):Promise<Response> {
    try {
      const { limit, skip, filterBy, order, orderBy, empresaId } = request.query
      const empresa = empresaId? String(empresaId) : null
      const formattedLimit = limit? Number(limit) : null
      const formattedSkip = skip?  Number(skip) : null
      const formattedFilterBy = filterBy? String(filterBy) : null
      const formattedOrder = order? String(order) : null
      const formattedOrderBy = orderBy?  String(orderBy) : null

      const usuarioList = await this.usuarioServices.index(
        empresa,
        formattedLimit,
        formattedSkip,
        formattedFilterBy,
        formattedOrder,
        formattedOrderBy
      )
  
      return response.status(200).json(usuarioList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async updateAdm(request:Request, response:Response):Promise<Response> {
    try {
      const { id_usuario, nome, status, email, cargo, senha, empresa, verificado } = request.body
      const usuario:IUpdateUsuarioDTO = {
        id_usuario, 
        nome, 
        status, 
        email, 
        cargo, 
        senha,
        empresa,
        verificado
      }

      await this.usuarioServices.update(usuario)
  
      return response.status(200).json({msg: "usuario updated"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async changeStatusAdm(request:Request, response:Response):Promise<Response> {
    try {
      const { id, empresa } = request.body

      await this.usuarioServices.changeStatus(id, empresa)
  
      return response.status(200).json({msg: "usuario status update."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}