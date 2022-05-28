import { UserController } from "./UserController"
import { FornecedorController } from "./FornecedorController"
import { CategoriaController } from "./CategoriaController"
import { ProdutoController } from "./ProdutoController"

import { 
  categoriaServices,
  fornecedorServices,
  produtoServices,
  userServices
} from "@services"

const userController = new UserController(userServices)
const fornecedorController = new FornecedorController(fornecedorServices)
const categoriaController = new CategoriaController(categoriaServices)
const produtoController = new ProdutoController(produtoServices)

export { 
  userController,
  fornecedorController,
  categoriaController,
  produtoController
}

export {
  UserController,
  FornecedorController,
  CategoriaController,
  ProdutoController
}