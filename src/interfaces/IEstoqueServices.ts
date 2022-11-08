import { Estoque } from "@models"
import ExcelJS from 'exceljs'

export interface IEstoqueServices {
  index(empresa:string, limit?:number, skip?:number):Promise<Estoque[]>
  getInventario(empresa:string):Promise<ExcelJS.Workbook>
  getDaily(empresa:string):Promise<ExcelJS.Workbook>
  getEstoqueMinimo(empresa:string):Promise<ExcelJS.Workbook>
}