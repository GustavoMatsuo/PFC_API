import { SimpleProdutoDTO } from "@dto/ProdutoDTO"
import { Estoque, Produto } from "@models"
import { IProdutoRepository } from "@interfaces"
import { Repository } from "typeorm"

export class ProdutoRepository implements IProdutoRepository {
  private connection: Repository<Produto>

  constructor(connection:Repository<Produto>) {
    this.connection = connection
  }

  async listProdutos(
    empresa:string,
    limitNum?:number, 
    skipNum?:number, 
    name?:string,
    order?:string,
    tags?:string[]
  ): Promise<{ list: Produto[]; total: number }> {
    const query = this.connection
      .createQueryBuilder("produto")
      .leftJoinAndSelect("produto.fornecedor", "fornecedor.id_fornecedor")
      .leftJoinAndSelect("produto.categoria", "categoria.id_categoria")
      .innerJoinAndMapOne(
        "produto.estoque",
        Estoque,
        "estoque",
        "estoque.produto = produto.id_produto",
      )
      .where("produto.empresa_id = :empresa", { empresa })

    if(limitNum) query.take(limitNum)
    if(limitNum) query.skip(skipNum)

    if(name) {
      query.andWhere("LOWER(produto.nome) like LOWER(:nome)", { nome: `%${name}%` })
    }
      
    if(tags && tags.length > 0) {
      let whereSQL = ""
      tags.map((categoria, index) => {
        if(index === 0){
          whereSQL = tags.length === (index+1)?
            whereSQL + `( produto.categoria.id_categoria = '${categoria}' )`
          :
            whereSQL + `( produto.categoria.id_categoria = '${categoria}'`
        }else {
          whereSQL = tags.length === (index+1)?
            whereSQL + ` OR  produto.categoria.id_categoria = '${categoria}' )`
          :
            whereSQL + ` OR  produto.categoria.id_categoria = '${categoria}'`
        }
      })
      query.andWhere(whereSQL)
    }

    if(order) {
      const descOrAsc = String(order).toUpperCase() === "DESC"? "DESC":"ASC"
      query.orderBy('produto.nome', descOrAsc)
    }

    const produtoList = await query.getMany()

    const count = await query.getCount()

    return {list: produtoList, total: count}
  }

  async simpleList(empresa: string): Promise<SimpleProdutoDTO[]> {
    const produtoList:Array<any> = await this.connection
      .createQueryBuilder("produto")
      .select("produto.id_produto")
      .addSelect("produto.nome")
      .addSelect("produto.codigo")
      .addSelect("produto.valor_unitario")
      .addSelect("produto.desconto")
      .innerJoinAndMapOne(
        "produto.estoque",
        Estoque,
        "estoque",
        "estoque.produto = produto.id_produto",
      )
      .where("produto.empresa_id = :empresa", { empresa })
      .getMany()

    return produtoList
  }

  async findByCodigo(codigo: string, empresa: string): Promise<Produto> {
    const result = await this.connection.findOneBy({
      codigo: codigo,
      empresa_id: empresa
    })

    return result
  }

  async findByNome(nome: string, empresa: string): Promise<Produto> {
    const result = await this.connection.findOneBy({
      nome: nome,
      empresa_id: empresa
    })

    return result
  }
  
  async findById(id: string, empresa: string): Promise<Produto> {
    const result = await this.connection.findOneBy({
      id_produto: id,
      empresa_id: empresa
    })

    return result
  }
  
  async saveProduto(produto: Produto): Promise<Produto> {
    const result = await this.connection.save(produto)

    return result
  }
  
  async updateProduto(produto: Produto): Promise<boolean> {
    const result = await this.connection.update(produto.id_produto, produto)

    return result.affected === 1
  }
}