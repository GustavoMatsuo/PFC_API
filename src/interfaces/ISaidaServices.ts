import { ICreateSaidaDTO } from "@dto/SaidaDTO"
import { Paginationlist } from "../globalTypes"
import ExcelJS from 'exceljs'

export interface ISaidaServices {
  create(data:ICreateSaidaDTO):Promise<void>
  index(
    empresa:string,
    limit?:string, 
    skip?:string, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist>
  getRelatorio(inicio:string, fim:string, empresa:string):Promise<ExcelJS.Workbook>
}