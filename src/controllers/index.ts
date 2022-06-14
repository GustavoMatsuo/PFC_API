import { UsuarioController } from "./UsuarioController"
import { FornecedorController } from "./FornecedorController"
import { CategoriaController } from "./CategoriaController"
import { ProdutoController } from "./ProdutoController"

import { 
  categoriaServices,
  fornecedorServices,
  produtoServices,
  usuarioServices
} from "@services"

const usuarioController = new UsuarioController(usuarioServices)
const fornecedorController = new FornecedorController(fornecedorServices)
const categoriaController = new CategoriaController(categoriaServices)
const produtoController = new ProdutoController(produtoServices)

export { 
  usuarioController,
  fornecedorController,
  categoriaController,
  produtoController
}

export {
  UsuarioController,
  FornecedorController,
  CategoriaController,
  ProdutoController
}