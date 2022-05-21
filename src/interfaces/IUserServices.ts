import { User } from "@models"
import { ICreateUserDTO, IUpdateUserDTO, ILoginUserDTO } from "@dto/UserDTO"

export interface IUserServices {
  index(limit?:string, skip?: string):Promise<Array<User>>
  login(data:ILoginUserDTO):Promise<User>
  create(data:ICreateUserDTO):Promise<void>
  update(data:IUpdateUserDTO):Promise<void>
  delete(id:string):Promise<void>
  changeStatus(id:string):Promise<void>
}