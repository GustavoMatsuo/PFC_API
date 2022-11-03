import { Entrada } from "@models"

export interface IEntradaRepository {
  listEntrada(
    empresa:string,
    limitNum?:number, 
    skipNum?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<{list: Entrada[], total: number}>
  saveEntrada(entrada:Entrada):Promise<Entrada>
}