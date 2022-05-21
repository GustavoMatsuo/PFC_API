import { User } from "@models"
import { ICreateUserRequestDTO, ILoginUserRequestDTO, IUpdateUserRequestDTO } from "../components/User/UserDTO"

export interface IUserServices {
  index(limit?:string, skip?: string):Promise<Array<User>>
  login(data:ILoginUserRequestDTO):Promise<User>
  create(data:ICreateUserRequestDTO):Promise<void>
  update(data:IUpdateUserRequestDTO):Promise<void>
  delete(id:string):Promise<void>
  changeStatus(id:string):Promise<void>
}