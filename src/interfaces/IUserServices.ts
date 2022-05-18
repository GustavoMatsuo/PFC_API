import { User } from "@models"
import { ICreateUserRequestDTO } from "../components/User/UserDTO"

export interface IUserServices {
  index():Promise<Array<User>>
  create(data:ICreateUserRequestDTO):Promise<void>
  update(data:ICreateUserRequestDTO):Promise<void>
  delete(id:string):Promise<void>
  changeStatus(id:string):Promise<void>
}