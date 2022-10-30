import { Produto, Saida } from "@models"
import { ISaidaServices } from "@interfaces"
import { SaidaRepository } from "@repositories"
import { ICreateSaidaDTO } from "@dto/SaidaDTO"
import { Paginationlist } from "../globalTypes"
import { fDateSimple, fDateTime } from "../utils/formatTime"
import ExcelJS from 'exceljs'

export class SaidaServices implements ISaidaServices {
  private saidaRepository: SaidaRepository

  constructor(saidaRepository:SaidaRepository) {
    this.saidaRepository = saidaRepository
  }

  async create(data:ICreateSaidaDTO):Promise<void> {
    const date = new Date()
    const venda = data.venda
    const saida = new Saida({
      ...data,
      venda: venda, 
      data_saida: date,
      desconto: data.desconto,
      empresa_id: data.empresa
    })

    await this.saidaRepository.save(saida)
  }

  async index(
    empresa:string,
    limit:string, 
    skip:string, 
    filterBy:string,
    order:string,
    orderBy:string
  ):Promise<Paginationlist> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const query = await this.saidaRepository
      .createQueryBuilder("saida")
      .leftJoinAndSelect("saida.venda", "venda")
      .leftJoinAndSelect("saida.produto", "produto")
      .where("saida.empresa_id = :empresa", { empresa })
      .take(limitNum)
      .skip(skipNum)

    if(filterBy) {
      query.where("LOWER(produto.nome) like LOWER(:nome)", { nome: `%${filterBy}%` })
    }

    if(order && orderBy) {
      const descOrAsc = String(order).toUpperCase() === "DESC"? "DESC":"ASC"
      query.orderBy(`saida.${orderBy}`, descOrAsc)
    }
    
    const saidaList = await query.getMany()

    const sumRow = await query.getCount()
    
    return {list: saidaList, total: sumRow}
  }

  
  async getRelatorio(inicio:string, fim:string, empresa:string):Promise<ExcelJS.Workbook> {
    let saidaList:any[] = await this.saidaRepository
      .createQueryBuilder("saida")
      .leftJoinAndSelect("saida.venda", "venda")
      .leftJoinAndSelect("saida.produto", "produto")
      .where(`saida.empresa_id = :empresa and saida.data_saida between '${inicio}' and '${fim}'`, { empresa })
      .getMany()    

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
