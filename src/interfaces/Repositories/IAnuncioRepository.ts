import { Anuncio } from "@models"

export interface IAnuncioRepository {
  listAnuncio(empresa:string):Promise<Anuncio[]>
  simpleList(empresa:string):Promise<Array<Object>>
  findById(id:string, empresa:string):Promise<Anuncio>
  saveAnuncio(anuncio:Anuncio):Promise<Anuncio>
  updateAnuncio(anuncio:Anuncio):Promise<boolean>
  delete(id:String):Promise<boolean>
}