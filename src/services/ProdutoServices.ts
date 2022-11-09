import { Produto } from "@models"
import { 
  IProdutoServices, 
  IFornecedorRepository, 
  ICategoriaRepository, 
  IProdutoRepository 
} from "@interfaces"
import { CreateProdutoDTO, UpdateProdutoDTO } from "@dto/ProdutoDTO"
import { Paginationlist } from "../globalTypes"

export class ProdutoServices implements IProdutoServices {
  private produtoRepository:IProdutoRepository
  private fornecedorRepository:IFornecedorRepository
  private categoriaRepository:ICategoriaRepository

  constructor(
    produtoRepository:IProdutoRepository,
    fornecedorRepository:IFornecedorRepository,
    categoriaRepository:ICategoriaRepository
  ) {
    this.produtoRepository = produtoRepository
    this.fornecedorRepository = fornecedorRepository
    this.categoriaRepository = categoriaRepository
  }

  async index(
    empresa:string, 
    limit?:number, 
    skip?:number,
    name?:string,
    order?:string,
    tags?:string[]
  ):Promise<Paginationlist> {
    const produtoList = this.produtoRepository.listProdutos(
      empresa, 
      limit, 
      skip,
      name,
      order,
      tags
    )
    
    return produtoList
  }

  async create(data:CreateProdutoDTO):Promise<void> {
    const produtoAlreadyExistsByName = await this.produtoRepository.findByNome(
      data.nome,
      data.empresa
    )

    const produtoAlreadyExistsByCodigo = await this.produtoRepository.findByCodigo(
      data.codigo, 
      data.empresa
    )

    if (produtoAlreadyExistsByName || produtoAlreadyExistsByCodigo) {
      throw new Error('Produto already exists.')
    }

    const fornecedor = await this.fornecedorRepository.findById(data.fornecedor, data.empresa)
    if(!fornecedor) {
      throw new Error('Fornecedor not found.')
    }

    const categoria = await this.categoriaRepository.findById(data.categoria, data.empresa)
    if(!categoria) {
      throw new Error('Categoria not found.')
    }

    const produto = new Produto({
      ...data, 
      fornecedor: fornecedor,
      categoria: categoria, 
      status: true,
      empresa_id: data.empresa
    })

    await this.produtoRepository.saveProduto(produto)
  }

  async update(data:UpdateProdutoDTO):Promise<void> {
    const produtoExists = await this.produtoRepository.findById(
      data.id_produto, 
      data.empresa
    )

    if (!produtoExists) {
      throw new Error('Produto not found.')
    }

    const newFornecedor = await this.fornecedorRepository.findById(
      data.fornecedor, 
      data.empresa
    )
    if(!newFornecedor) {
      throw new Error('fornecedor not found.')
    }

    const newCategoria = await this.categoriaRepository.findById(
      data.categoria, 
      data.empresa
    )
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

    await this.produtoRepository.updateProduto(produto)
  }

  async changeStatus(id:string, empresa:string):Promise<void> {
    let produtoExists = await this.produtoRepository.findById(id, empresa)

    if (!produtoExists) {
      throw new Error('Produto not found.')
    }

    produtoExists.status = !produtoExists.status

    await this.produtoRepository.updateProduto(produtoExists)
  }

  async simpleList(empresa:string):Promise<Object[]> {
    const produtoList = await this.produtoRepository.simpleList(empresa)

    const formattedList:Object[] = []

    produtoList.map(item => {
      formattedList.push({
        ...item,
        estoque: item.estoque.qtd
      })
    })
    
    return formattedList
  }
}
