import { 
  ICreateUsuarioDTO, 
  IUpdateUsuarioDTO, 
  ILoginUsuarioDTO,
} from "@dto/UsuarioDTO"
import { Paginationlist } from "../../globalTypes"

export type loginType = {
  token:string
  id:string
  nome:string 
  cargo:string
  email:string
}

export interface IUsuarioServices {
  index(
    empresa:string,
    limit?:number, 
    skip?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
  login(data:ILoginUsuarioDTO):Promise<loginType>
  create(data:ICreateUsuarioDTO):Promise<void>
  update(data:IUpdateUsuarioDTO):Promise<void>
  delete(userId:string, empresaId:string):Promise<void>
  changeStatus(userId:string, empresaId:string):Promise<void>
  reset(email:string):Promise<void>
  newPassword(senha:string, userId:string, empresaId:string):Promise<void>
  delete(senha:string, userId: string):Promise<void>
}