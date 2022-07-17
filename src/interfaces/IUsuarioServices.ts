import { Usuario } from "@models"
import { ICreateUsuarioDTO, IUpdateUsuarioDTO, ILoginUsuarioDTO } from "@dto/UsuarioDTO"
import { Paginationlist } from "src/globalTypes"

export type loginType = {
  token: string
  id: string
  name: string 
  email: string
}

export interface IUsuarioServices {
  index(limit?:string, skip?: string):Promise<Paginationlist>
  login(data:ILoginUsuarioDTO):Promise<loginType>
  create(data:ICreateUsuarioDTO):Promise<void>
  update(data:IUpdateUsuarioDTO):Promise<void>
  delete(id:string):Promise<void>
  changeStatus(id:string):Promise<void>
}