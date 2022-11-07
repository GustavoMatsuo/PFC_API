import { Saida } from "@models"

export interface ISaidaRepository {
  listSaida(
    empresa: string,
    limitNum?:number, 
    skipNum?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<{list: Saida[], total: number}>
  listRelatorio(
    inicio:string, 
    fim:string,
    empresa:string
  ):Promise<Saida[]>
  saveSaida(saida:Saida):Promise<Saida>
}