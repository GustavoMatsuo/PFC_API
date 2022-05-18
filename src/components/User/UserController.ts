import { Response, Request } from "express"
import { IUserServices } from '../../interfaces/IUserServices'
import { ICreateUserRequestDTO, IUpdateUserRequestDTO } from "./UserDTO"

export class UserController {
  private userServices:IUserServices

  constructor(userServices:IUserServices) {
    this.userServices = userServices
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const userList = await this.userServices.index()
  
      return response.status(200).json(userList)
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { name, email, role, password, userId } = request.body
      const user:ICreateUserRequestDTO = {name, email, role, password}

      await this.userServices.create(user)
  
      return response.status(201).json({msg: "user created"})
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }

  async update(request:Request, response:Response):Promise<Response> {
    try {
      const { id, name, status, email, role, password } = request.body
      const user:IUpdateUserRequestDTO = {id, name, status, email, role, password}

      await this.userServices.update(user)
  
      return response.status(200).json({msg: "user updated"})
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }

  async delete(request:Request, response:Response):Promise<Response> {    
    try {
      const { id } = request.body

      await this.userServices.delete(id)
  
      return response.status(200).json({msg: "user deleted"})
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }

  
  async changeStatus(request:Request, response:Response):Promise<Response> {
    try {
      const { id } = request.body

      await this.userServices.changeStatus(id)
  
      return response.status(200).json({msg: "user status update."})
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}