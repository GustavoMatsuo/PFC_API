import { Entrada, Estoque, Produto, Saida } from "@models"
import { IEstoqueRepository } from "@interfaces"
import { Repository } from "typeorm"

export class EstoqueRepository implements IEstoqueRepository {
  private connection: Repository<Estoque>

  constructor(connection:Repository<Estoque>) {
    this.connection = connection
  }

  async listEstoque(empresa: string): Promise<Estoque[]> {
    const estoqueList = await this.connection
    .createQueryBuilder("estoque")
    .leftJoinAndSelect("estoque.produto", "estoque.id_produto")
    .where("estoque.empresa_id = :empresa", { empresa })
    .getMany()

    return estoqueList
  }

  async findEstoqueComMov(empresa:string): Promise<any[]> {
    let estoqueListComMov:any[] = await this.connection.createQueryBuilder("estoque")
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

    return estoqueListComMov
  }

  async findEstoqueSemMov(empresa:string): Promise<any[]> {
    let estoqueListSemMov:any[] = await this.connection.createQueryBuilder("estoque")
      .leftJoinAndSelect("estoque.produto", "estoque.id_produto")
      .where("estoque.empresa_id = :empresa and estoque.qtd = 0", { empresa })
      .getMany()

    return estoqueListSemMov
  }

  async findEstoqueEntrada(
    empresa: string,
    initialDate:string,
    finalDate:string
  ): Promise<any[]> {
    let entradaList:any[] = await this.connection.createQueryBuilder("estoque")
    .leftJoinAndSelect("estoque.produto", "estoque.id_produto")
    .innerJoinAndMapMany(
      "estoque.entrada",
      Entrada,
      "entrada",
      `entrada.produto = estoque.produto and entrada.data_entrada between '${initialDate}' and '${finalDate}'`,
    )
    .where("estoque.empresa_id = :empresa", { empresa })
    .getMany()

    return entradaList
  }

  async findEstoqueSaida(
    empresa: string,
    initialDate:string,
    finalDate:string
  ): Promise<any[]> {
    let saidaList:any[] = await this.connection.createQueryBuilder("estoque")
    .leftJoinAndSelect("estoque.produto", "estoque.id_produto")
    .innerJoinAndMapMany(
      "estoque.saida",
      Saida,
      "saida",
      `saida.produto = estoque.produto and saida.data_saida between '${initialDate}' and '${finalDate}'`,
    )
    .where("estoque.empresa_id = :empresa", { empresa })
    .getMany()

    return saidaList
  }

  async findEstoqueMinimo(empresa: string): Promise<any[]> {
    let estoqueMinimo:any[] = await this.connection.createQueryBuilder("estoque")
    .leftJoinAndSelect("estoque.produto", "estoque.id_produto")
    .innerJoinAndMapMany(
      "estoque.estoque_minimo",
      Produto,
      "produto",
      "produto.estoque_minimo >= estoque.qtd and estoque.produto = produto.id_produto",
    )
    .where("estoque.empresa_id = :empresa", { empresa })
    .getMany() 

    return estoqueMinimo
  }
}