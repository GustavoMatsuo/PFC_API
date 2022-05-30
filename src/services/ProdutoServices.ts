import { Produto } from "@models"
import { IProdutoServices } from "@interfaces"
import { CategoriaRepository, FornecedorRepository, ProdutoRepository } from "@repositories"
import { ICreateProdutoDTO, IUpdateProdutoDTO } from "@dto/ProdutoDTO"

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

  async index(limit:string, skip:string):Promise<Array<Produto>> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const produtoList = await this.produtoRepository
      .createQueryBuilder("produto")
      .leftJoinAndSelect("produto.fornecedor", "fornecedor.id_fornecedor")
      .leftJoinAndSelect("produto.categoria", "categoria.id_categoria")
      .take(limitNum)
      .skip(skipNum)
      .getMany()

    return produtoList
  }

  async create(data:ICreateProdutoDTO):Promise<void> {
    const produtoAlreadyExists = await this.produtoRepository.findOneBy({
      nome: data.nome
    })

    if (produtoAlreadyExists) {
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

    const produto = new Produto({...data, fornecedor: fornecedor, categoria: categoria, status: true})

    await this.produtoRepository.save(produto)
  }

  async update(data:IUpdateProdutoDTO):Promise<void> {
    const produtoExists = await this.produtoRepository.findOneBy({id_produto: data.id_produto})

    if (!produtoExists) {
      throw new Error('Produto not found.')
    }

    const fornecedor = await this.fornecedorRepository.findOneBy({id_fornecedor: data.fornecedor})
    if(!fornecedor) {
      throw new Error('fornecedor not found.')
    }

    const categoria = await this.categoriaRepository.findOneBy({id_categoria: data.categoria})
    if(!fornecedor) {
      throw new Error('categoria not found.')
    }

    const produto = new Produto({...data, fornecedor: fornecedor, categoria: categoria})

    await this.produtoRepository.update(data.id_produto, produto)
  }

  async changeStatus(id:string):Promise<void> {
    let produtoExists = await this.produtoRepository.findOneBy({id_produto: id})

    if (!produtoExists) {
      throw new Error('Produto not found.')
    }

    produtoExists.status = !produtoExists.status

    await this.produtoRepository.update(id, produtoExists)
  }

  async updateEstoque(id:string, qtd:number):Promise<void> {
    let produtoExists = await this.produtoRepository.findOneBy({id_produto: id})

    if (!produtoExists) {
      throw new Error('Produto not found.')
    }

    produtoExists.qtdEstoque = qtd

    await this.produtoRepository.update(id, produtoExists)
  }
}
