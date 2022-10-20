import { Estoque } from "src/models/Estoque"
import ExcelJS from 'exceljs'

export interface IEstoqueServices {
  index(limit?:string, skip?:string):Promise<Array<Estoque>>
  getInventario(empresa:string):Promise<ExcelJS.Workbook>
  getDaily(empresa:string):Promise<ExcelJS.Workbook>
  getEstoqueMinimo(empresa:string):Promise<ExcelJS.Workbook>
}