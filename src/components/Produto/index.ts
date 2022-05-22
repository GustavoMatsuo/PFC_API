import { Categoria, Fornecedor, Produto } from "@models"
import { ProdutoServices } from "./ProdutoServices"
import { ProdutoController } from "./ProdutoController"
import { db } from '../../config/database'

const produtoRepository = db.getRepository(Produto)
const fornecedorRepository = db.getRepository(Fornecedor)
const categoriaRepository = db.getRepository(Categoria)

const produtoServices = new ProdutoServices(
  produtoRepository,
  fornecedorRepository,
  categoriaRepository
)

const produtoController = new ProdutoController(
  produtoServices
)

export { produtoServices, produtoController }