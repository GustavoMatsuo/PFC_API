import { CreateSaidaDTO } from "@dto/SaidaDTO"
import { Paginationlist } from "../globalTypes"
import ExcelJS from 'exceljs'

export interface ISaidaServices {
  create(data:CreateSaidaDTO):Promise<void>
  index(
    empresa:string,
    limit?:number, 
    skip?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
  getRelatorio(inicio:string, fim:string, empresa:string):Promise<ExcelJS.Workbook>
}