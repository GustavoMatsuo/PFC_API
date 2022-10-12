import { Entrada, Estoque, Produto, Saida } from "@models"
import { IEstoqueServices } from "@interfaces"
import { EstoqueRepository } from "@repositories"
import ExcelJS from 'exceljs'

export class EstoqueServices implements IEstoqueServices {
  private estoqueRepository: EstoqueRepository

  constructor(estoqueRepository:EstoqueRepository) {
    this.estoqueRepository = estoqueRepository
  }

  async index():Promise<Array<Estoque>> {
    const estoqueList:any[] = await this.estoqueRepository.createQueryBuilder("estoque")
      .leftJoinAndSelect("estoque.produto", "estoque.id_produto")
      .getMany()

    return estoqueList
  }

  async getInventario(empresa:string):Promise<ExcelJS.Workbook> {
    let estoqueListComMov:any[] = await this.estoqueRepository.createQueryBuilder("estoque")
      .leftJoinAndSelect("estoque.produto", "estoque.id_produto")
      .innerJoinAndMapMany(
        "estoque.entrada",
        Entrada,
        "entrada",
        "entrada.produto = estoque.produto",
      )
      .innerJoinAndMapMany(
        "estoque.saida",
        Saida,
        "saida",
        "saida.produto = estoque.produto",
      )
      .where("estoque.empresa_id = :empresa", { empresa })
      .getMany()
    
    let estoqueListSemMov:any[] = await this.estoqueRepository.createQueryBuilder("estoque")
      .leftJoinAndSelect("estoque.produto", "estoque.id_produto")
      .where("estoque.empresa_id = :empresa and estoque.qtd = 0", { empresa })
      .getMany()
    
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
}
