import { Estoque, Produto } from "@models"
import { IEstoqueServices, IEstoqueRepository } from "@interfaces"
import { fDateSimple } from "../utils/formatTime"
import ExcelJS from 'exceljs'

export class EstoqueServices implements IEstoqueServices {
  private estoqueRepository: IEstoqueRepository

  constructor(estoqueRepository:IEstoqueRepository) {
    this.estoqueRepository = estoqueRepository
  }

  async index(empresa:string, limit?:number, skip?:number):Promise<Estoque[]> {
    const estoqueList = await this.estoqueRepository.listEstoque(empresa, limit, skip)

    return estoqueList
  }

  async getInventario(empresa:string):Promise<ExcelJS.Workbook> {
    let estoqueListComMov:any[] = await this.estoqueRepository.findEstoqueComMov(empresa)
    
    let estoqueListSemMov:any[] = await this.estoqueRepository.findEstoqueSemMov(empresa)

    const estoqueListRaw:any[] = [...estoqueListComMov,...estoqueListSemMov]

    const estoqueList:any[] = []
    
    for(let i = 0; i < estoqueListRaw.length; i++) {
      const estoque = estoqueListRaw[i]     
      if(!estoqueList.some(item => item.id_estoque === estoque.id_estoque)){
        estoqueList.push({
          ...estoque,
          entrada: estoque.entrada? estoque.entrada.reduce((prev, current) => prev + current.qtd, 0):0,
          saida: estoque.saida? estoque.saida.reduce((prev, current) => prev + current.qtd, 0):0
        })
      }
    }

    const workbook = new ExcelJS.Workbook()

    const sheet = workbook.addWorksheet(`Inventario`)
  
    sheet.columns = [
      { header: 'Nome', key: 'nome' },
      { header: 'Cod. de barras', key: 'cod' },
      { header: 'Estoque minimo', key: 'estoque' },
      { header: 'Entrada', key: 'entrada' },
      { header: 'Saída', key: 'saida' },
      { header: 'Quantidade atual', key: 'qtd' },
    ]

    estoqueList.map(item => {
      const produto:Produto = item.produto 
      sheet.addRow({ 
        nome: produto.nome, 
        cod: produto.codigo, 
        estoque: produto.estoque_minimo,
        entrada: item.entrada,
        saida: item.saida,
        qtd: item.qtd
      })
    })

    //COLUMN STYLES
    sheet.getColumn(2).alignment = { horizontal: 'center' }
    sheet.getColumn(3).alignment = { horizontal: 'center' }
    sheet.getColumn(4).alignment = { horizontal: 'center' }
    sheet.getColumn(5).alignment = { horizontal: 'center' }
    sheet.getColumn(6).alignment = { horizontal: 'center' }

    //ROW STYLES
    sheet.getRow(1).height = 20
    sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'909090'},
    }
    sheet.getRow(1).font = {
      color: { argb: 'FFFFFF' },
      bold: true
    }

    sheet.columns.forEach(function (column, i) {
      var maxLength = 0
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 15
        if (columnLength > maxLength ) {
            maxLength = columnLength
        }
      })
      column.width = maxLength < 15 ? 15 : maxLength
    })

    return workbook
  }

  async getDaily(empresa:string):Promise<ExcelJS.Workbook> {
    const todaySimple = fDateSimple(new Date())

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowSimple = fDateSimple(tomorrow)

    let entradaList:any[] = await this.estoqueRepository.findEstoqueEntrada(empresa, todaySimple, tomorrowSimple)
    
    let saidaList:any[] = await this.estoqueRepository.findEstoqueSaida(empresa, todaySimple, tomorrowSimple)

    const workbook = new ExcelJS.Workbook()

    // SAIDA SHEET
    const sheetSaida = workbook.addWorksheet(`Saida (${todaySimple})`)

    sheetSaida.columns = [
      { header: 'Nome', key: 'nome' },
      { header: 'Cod. de barras', key: 'cod' },
      { header: 'Saída', key: 'saida' },
      { header: 'Quantidade atual', key: 'qtd' },
    ]

    const formattedSaida:any[] = []
    
    for(let i = 0; i < saidaList.length; i++) {
      const estoque = saidaList[i]     
      if(!formattedSaida.some(item => item.id_estoque === estoque.id_estoque)){
        formattedSaida.push({
          ...estoque,
          saida: estoque.saida? estoque.saida.reduce((prev, current) => prev + current.qtd, 0):0
        })
      }
    }

    formattedSaida.map(item => {
      const produto:Produto = item.produto 
      sheetSaida.addRow({ 
        nome: produto.nome, 
        cod: produto.codigo, 
        saida: item.saida,
        qtd: item.qtd
      })
    })

    //COLUMN STYLES
    sheetSaida.getColumn(2).alignment = { horizontal: 'center' }
    sheetSaida.getColumn(3).alignment = { horizontal: 'center' }
    sheetSaida.getColumn(4).alignment = { horizontal: 'center' }
    sheetSaida.getColumn(5).alignment = { horizontal: 'center' }

    //ROW STYLES
    sheetSaida.getRow(1).height = 20
    sheetSaida.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
    sheetSaida.getRow(1).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FF4842'},
    }
    sheetSaida.getRow(1).font = {
      color: { argb: 'FFFFFF' },
      bold: true
    }

    sheetSaida.columns.forEach(function (column, i) {
      var maxLength = 0
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 15
        if (columnLength > maxLength ) {
            maxLength = columnLength
        }
      })
      column.width = maxLength < 15 ? 15 : maxLength
    })

    // ENTRADA SHEET
    const sheetEntrada = workbook.addWorksheet(`Entrada (${todaySimple})`)

    sheetEntrada.columns = [
      { header: 'Nome', key: 'nome' },
      { header: 'Cod. de barras', key: 'cod' },
      { header: 'Entrada', key: 'entrada' },
      { header: 'Quantidade atual', key: 'qtd' },
    ]

    const formattedEntrada:any[] = []
    
    for(let i = 0; i < entradaList.length; i++) {
      const estoque = entradaList[i]     
      if(!formattedEntrada.some(item => item.id_estoque === estoque.id_estoque)){
        formattedEntrada.push({
          ...estoque,
          entrada: estoque.entrada? estoque.entrada.reduce((prev, current) => prev + current.qtd, 0):0,
        })
      }
    }

    formattedEntrada.map(item => {
      const produto:Produto = item.produto 
      sheetEntrada.addRow({ 
        nome: produto.nome, 
        cod: produto.codigo, 
        entrada: item.entrada,
        qtd: item.qtd
      })
    })

    //COLUMN STYLES
    sheetEntrada.getColumn(2).alignment = { horizontal: 'center' }
    sheetEntrada.getColumn(3).alignment = { horizontal: 'center' }
    sheetEntrada.getColumn(4).alignment = { horizontal: 'center' }
    sheetEntrada.getColumn(5).alignment = { horizontal: 'center' }

    //ROW STYLES
    sheetEntrada.getRow(1).height = 20
    sheetEntrada.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
    sheetEntrada.getRow(1).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'54D62C'},
    }
    sheetEntrada.getRow(1).font = {
      color: { argb: 'FFFFFF' },
      bold: true
    }

    sheetEntrada.columns.forEach(function (column, i) {
      var maxLength = 0
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 15
        if (columnLength > maxLength ) {
            maxLength = columnLength
        }
      })
      column.width = maxLength < 15 ? 15 : maxLength
    })

    return workbook
  }

  async getEstoqueMinimo(empresa:string):Promise<ExcelJS.Workbook> {
    let estoqueMinimo:any[] = await this.estoqueRepository.findEstoqueMinimo(empresa)   

    const workbook = new ExcelJS.Workbook()

    const sheet = workbook.addWorksheet(`Estoque mínimo`)
  
    sheet.columns = [
      { header: 'Nome', key: 'nome' },
      { header: 'Cod. de barras', key: 'cod' },
      { header: 'Estoque minimo', key: 'estoque' },
      { header: 'Quantidade atual', key: 'qtd' }
    ]

    estoqueMinimo.map(item => {
      const produto:Produto = item.produto 
      sheet.addRow({ 
        nome: produto.nome, 
        cod: produto.codigo, 
        estoque: produto.estoque_minimo,
        qtd: item.qtd
      })
    })

    //COLUMN STYLES
    sheet.getColumn(2).alignment = { horizontal: 'center' }
    sheet.getColumn(3).alignment = { horizontal: 'center' }
    sheet.getColumn(4).alignment = { horizontal: 'center' }
    sheet.getColumn(5).alignment = { horizontal: 'center' }

    //ROW STYLES
    sheet.getRow(1).height = 20
    sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FF4842'},
    }
    sheet.getRow(1).font = {
      color: { argb: 'FFFFFF' },
      bold: true
    }

    sheet.columns.forEach(function (column, i) {
      var maxLength = 0
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 15
        if (columnLength > maxLength ) {
            maxLength = columnLength
        }
      })
      column.width = maxLength < 15 ? 15 : maxLength
    })

    return workbook
  }
}
