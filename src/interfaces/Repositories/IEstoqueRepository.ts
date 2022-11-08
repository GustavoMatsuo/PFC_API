import { Estoque } from "@models"

export interface IEstoqueRepository {
  listEstoque(
    empresa:string, 
    limit?:number, 
    skip?:number
  ):Promise<Estoque[]>
  findEstoqueComMov(empresa:string):Promise<any[]>
  findEstoqueSemMov(empresa:string):Promise<any[]>
  findEstoqueEntrada(
    empresa:string,
    initialDate:string,
    finalDate:string
  ):Promise<any[]>
  findEstoqueSaida(
    empresa:string,
    initialDate:string,
    finalDate:string
  ):Promise<any[]>
  findEstoqueMinimo(empresa:string):Promise<any[]>
}