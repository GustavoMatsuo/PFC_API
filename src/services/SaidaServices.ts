import { Produto, Saida } from "@models"
import { ISaidaServices } from "@interfaces"
import { CreateSaidaDTO } from "@dto/SaidaDTO"
import { Paginationlist } from "../globalTypes"
import { fDateSimple, fDateTime } from "../utils/formatTime"
import ExcelJS from 'exceljs'
import { ISaidaRepository } from "src/interfaces/Repositories/ISaidaRepository"
import { IProdutoRepository } from "src/interfaces/Repositories/IProdutoRepository"
import { IVendaRepository } from "src/interfaces/Repositories/IVendaRepository"

export class SaidaServices implements ISaidaServices {
  private saidaRepository: ISaidaRepository
  private vendaRepository: IVendaRepository
  private produtoRepository: IProdutoRepository

  constructor(
    saidaRepository:ISaidaRepository,
    vendaRepository: IVendaRepository,
    produtoRepository: IProdutoRepository

  ) {
    this.saidaRepository = saidaRepository
    this.vendaRepository = vendaRepository
    this.produtoRepository = produtoRepository
  }

  async create(data:CreateSaidaDTO):Promise<void> {
    const date = new Date()

    let existVenda = await this.vendaRepository.findById(data.venda, data.empresa)

    if(!existVenda) {
      existVenda = null
    }

    const existProduto = await this.produtoRepository.findById(data.produto, data.empresa)

    if(!existProduto) {
      throw new Error('produto not found.')
    }

    const saida = new Saida({
      ...data,
      produto: existProduto,
      venda: existVenda,
      data_saida: date,
      desconto: data.desconto,
      empresa_id: data.empresa
    })

    await this.saidaRepository.saveSaida(saida)
  }

  async index(
    empresa:string,
    limit?:number, 
    skip?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<Paginationlist> {
    const saidaList = this.saidaRepository.listSaida(
      empresa,
      limit, 
      skip, 
      filterBy,
      order,
      orderBy
    )

    return saidaList
  }

  
  async getRelatorio(inicio:string, fim:string, empresa:string):Promise<ExcelJS.Workbook> {
    const saidaList = await this.saidaRepository.listRelatorio(
      inicio,
      fim,
      empresa
    )  

    const workbook = new ExcelJS.Workbook()

    const todaySimple = fDateSimple(new Date())

    const sheet = workbook.addWorksheet(`Saida (${todaySimple})`)

    sheet.columns = [
      { header: 'Produto', key: 'produto' },
      { header: 'Cod. de barras', key: 'cod' },
      { header: 'Data', key: 'data' },
      { header: 'Quantidade', key: 'qtd' },
      { header: 'Venda', key: 'venda' },
      { header: 'Desconto', key: 'desconto' },
      { header: 'Valor', key: 'valor' },
    ]

    saidaList.map(item => {
      const produto:Produto = item.produto 
      sheet.addRow({ 
        produto: produto.nome, 
        cod: produto.codigo, 
        data: fDateTime(item.data_saida),
        qtd: item.qtd,
        venda: item.venda? item.venda.id_venda.substring(0, 4):"",
        desconto: item.desconto,
        valor: item.valor_unitario
      })
    })

    //COLUMN STYLES
    sheet.getColumn(2).alignment = { horizontal: 'center' }
    sheet.getColumn(3).alignment = { horizontal: 'center' }
    sheet.getColumn(4).alignment = { horizontal: 'center' }
    sheet.getColumn(5).alignment = { horizontal: 'center' }
    sheet.getColumn(6).alignment = { horizontal: 'center' }
    sheet.getColumn(7).alignment = { horizontal: 'center' }

    sheet.getColumn(7).numFmt = '"R$"#,##0.00;[Red]\-"R$"#,##0.00';

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
