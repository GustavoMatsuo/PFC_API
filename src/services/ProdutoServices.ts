import { Estoque, Produto } from "@models"
import { IProdutoServices } from "@interfaces"
import { CategoriaRepository, FornecedorRepository, ProdutoRepository } from "@repositories"
import { ICreateProdutoDTO, IUpdateProdutoDTO } from "@dto/ProdutoDTO"
import { Paginationlist } from "../globalTypes"

export class ProdutoServices implements IProdutoServices {
  private produtoRepository:ProdutoRepository
  private fornecedorRepository:FornecedorRepository
  private categoriaRepository:CategoriaRepository

  constructor(
    produtoRepository:ProdutoRepository,
    fornecedorRepository:FornecedorRepository,
    categoriaRepository:CategoriaRepository
  ) {
    this.produtoRepository = produtoRepository
    this.fornecedorRepository = fornecedorRepository
    this.categoriaRepository = categoriaRepository
  }

  async index(empresa:string, limit:string, skip:string):Promise<Paginationlist> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const produtoList = await this.produtoRepository
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
      .take(limitNum)
      .skip(skipNum)
      .getMany()

    const sumRow = await this.produtoRepository.count()
  
    return {list: produtoList, total: sumRow}
  }

  async create(data:ICreateProdutoDTO):Promise<void> {
      const produtoAlreadyExistsByName = await this.produtoRepository.findOneBy({
      nome: data.nome
    })

    const produtoAlreadyExistsByCodigo = await this.produtoRepository.findOneBy({
      codigo: data.codigo
    })

    if (produtoAlreadyExistsByName || produtoAlreadyExistsByCodigo) {
      throw new Error('Produto already exists.')
    }

    const fornecedor = await this.fornecedorRepository.findOneBy({id_fornecedor: data.fornecedor})
    if(!fornecedor) {
      throw new Error('Fornecedor not found.')
    }

    const categoria = await this.categoriaRepository.findOneBy({id_categoria: data.categoria})
    if(!categoria) {
      throw new Error('Categoria not found.')
    }

    const produto = new Produto({
      ...data, 
      fornecedor: fornecedor,
      categoria: categoria, 
      status: true,
      empresa: data.empresa,
      empresa_id: data.empresa
    })

    await this.produtoRepository.save(produto)
  }

  async update(data:IUpdateProdutoDTO):Promise<void> {
    const produtoExists = await this.produtoRepository.findOneBy({id_produto: data.id_produto})

    if (!produtoExists) {
      throw new Error('Produto not found.')
    }

    const newFornecedor = await this.fornecedorRepository.findOneBy({id_fornecedor: data.fornecedor})
    if(!newFornecedor) {
      throw new Error('fornecedor not found.')
    }

    const newCategoria = await this.categoriaRepository.findOneBy({id_categoria: data.categoria})
    if(!newCategoria) {
      throw new Error('categoria not found.')
    }

    const produto = new Produto({
      ...data, 
      fornecedor: newFornecedor, 
      categoria: newCategoria,
      empresa_id: data.empresa,
      desconto: data.desconto? data.desconto:0
    })

    await this.produtoRepository.update(data.id_produto, produto)
  }

  async changeStatus(id:string, empresa:string):Promise<void> {
    let produtoExists = await this.produtoRepository.findOneBy({
      id_produto: id, 
      empresa_id: empresa 
    })

    if (!produtoExists) {
      throw new Error('Produto not found.')
    }

    produtoExists.status = !produtoExists.status

    await this.produtoRepository.update(id, produtoExists)
  }

  async simpleList(empresa:string):Promise<Array<Object>> {
    const produtoList = await this.produtoRepository
      .createQueryBuilder("produto")
      .select("produto.id_produto")
      .addSelect("produto.nome")
      .addSelect("produto.codigo")
      .addSelect("produto.valor_unitario")
      .addSelect("produto.desconto")
      .where("produto.empresa_id = :empresa", { empresa })
      .getMany()

    return produtoList
  }
}
