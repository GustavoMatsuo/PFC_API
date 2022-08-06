import { Usuario } from "@models"
import { ICreateUsuarioDTO, IUpdateUsuarioDTO, ILoginUsuarioDTO } from "@dto/UsuarioDTO"
import { Paginationlist } from "src/globalTypes"

export type loginType = {
  token: string
  id: string
  nome: string 
  email: string
}

export interface IUsuarioServices {
  index(limit?:string, skip?: string, filterBy?:string):Promise<Paginationlist>
  login(data:ILoginUsuarioDTO):Promise<loginType>
  create(data:ICreateUsuarioDTO):Promise<void>
  update(data:IUpdateUsuarioDTO):Promise<void>
  delete(id:string):Promise<void>
  changeStatus(id:string):Promise<void>
  reset(email:string):Promise<void>
  newPassword(senha:string, userId: string):Promise<void>
}