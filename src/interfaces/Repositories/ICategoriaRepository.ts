import { Categoria } from "@models"

export interface ICategoriaRepository {
  listCategoria(empresa:string):Promise<Categoria[]>
  simpleList(empresa:string):Promise<Array<Object>>
  findByNome(nome:string, empresa:string):Promise<Categoria>
  findById(id:string, empresa:string):Promise<Categoria>
  saveCategoria(categoria:Categoria):Promise<Categoria>
  updateCategoria(categoria:Categoria):Promise<boolean>
  delete(id:String):Promise<boolean>
}