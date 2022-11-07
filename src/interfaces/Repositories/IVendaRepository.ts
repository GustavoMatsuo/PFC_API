import { VendaSaidaDTO } from "@dto/SaidaDTO"
import { Venda } from "@models"

export interface IVendaRepository {
  listVenda(empresa:string):Promise<Venda[]>
  findById(id:string, empresa:string):Promise<Venda>
  findBetweenDate(
    usuario:string, 
    empresa:string, 
    initialDate:Date,
    finalDate:Date
    ):Promise<Venda[]>
  saveVenda(venda: Venda, saidas:VendaSaidaDTO[]):Promise<Venda>
}