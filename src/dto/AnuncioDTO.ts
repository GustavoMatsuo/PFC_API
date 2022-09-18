export interface ICreateAnuncioDTO {
  titulo:string
  texto:string
  usuario: string
  empresa:string
}

export interface IUpdateAnuncioDTO {
  id_anuncio:string
  titulo:string
  texto:string
  usuario: string
  empresa:string
}