import { UserServices } from "./UserServices"
import { FornecedorServices } from "./FornecedorServices"
import { CategoriaServices } from "./CategoriaServices"
import { ProdutoServices } from "./ProdutoServices"

import { 
  categoriaRepository,
  fornecedorRepository,
  produtoRepository,
  usersRepository 
} from "@repositories" 

const userServices = new UserServices(usersRepository)
const fornecedorServices = new FornecedorServices(fornecedorRepository)
const categoriaServices = new CategoriaServices(categoriaRepository)
const produtoServices = new ProdutoServices(
  produtoRepository, 
  fornecedorRepository, 
  categoriaRepository
)

export { 
  userServices,
  fornecedorServices,
  categoriaServices,
  produtoServices
}

export {
  UserServices,
  FornecedorServices,
  CategoriaServices,
  ProdutoServices
}