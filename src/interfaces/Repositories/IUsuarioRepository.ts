import { Usuario } from "@models"

export interface IUsuarioRepository {
  listUsuario(
    empresa:string,
    limit?:number, 
    skip?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<{list: Usuario[], total: number}>
  findByEmail(email:string):Promise<Usuario>
  findById(id:string, empresa:string):Promise<Usuario>
  saveUsuario(usuario:Usuario):Promise<Usuario>
  updateUsuario(usuario:Usuario):Promise<boolean>
  deleteUsuario(usuario:Usuario):Promise<boolean>
}