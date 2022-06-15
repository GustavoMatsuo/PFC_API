import { UsuarioController } from "./UsuarioController"
import { FornecedorController } from "./FornecedorController"
import { CategoriaController } from "./CategoriaController"
import { ProdutoController } from "./ProdutoController"
import { EntradaController } from "./EntradaController"

import { 
  categoriaServices,
  fornecedorServices,
  produtoServices,
  usuarioServices,
  entradaServices
} from "@services"

const usuarioController = new UsuarioController(usuarioServices)
const fornecedorController = new FornecedorController(fornecedorServices)
const categoriaController = new CategoriaController(categoriaServices)
const produtoController = new ProdutoController(produtoServices)
const entradaController = new EntradaController(entradaServices)

export { 
  usuarioController,
  fornecedorController,
  categoriaController,
  produtoController,
  entradaController
}

export {
  UsuarioController,
  FornecedorController,
  CategoriaController,
  ProdutoController,
  EntradaController
}