import { Usuario } from "@models"
import { ICreateUsuarioDTO, IUpdateUsuarioDTO, ILoginUsuarioDTO } from "@dto/UsuarioDTO"

export interface IUsuarioServices {
  index(limit?:string, skip?: string):Promise<Array<Usuario>>
  login(data:ILoginUsuarioDTO):Promise<Usuario>
  create(data:ICreateUsuarioDTO):Promise<void>
  update(data:IUpdateUsuarioDTO):Promise<void>
  delete(id:string):Promise<void>
  changeStatus(id:string):Promise<void>
}