import { UsuarioController } from "./UsuarioController"
import { FornecedorController } from "./FornecedorController"
import { CategoriaController } from "./CategoriaController"
import { ProdutoController } from "./ProdutoController"
import { EntradaController } from "./EntradaController"
import { ClienteController } from "./ClienteController"
import { 
  categoriaServices,
  fornecedorServices,
  produtoServices,
  usuarioServices,
  entradaServices,
  clienteServices
} from "@services"

const usuarioController = new UsuarioController(usuarioServices)
const fornecedorController = new FornecedorController(fornecedorServices)
const categoriaController = new CategoriaController(categoriaServices)
const produtoController = new ProdutoController(produtoServices)
const entradaController = new EntradaController(entradaServices)
const clienteController = new ClienteController(clienteServices)

export { 
  usuarioController,
  fornecedorController,
  categoriaController,
  produtoController,
  entradaController,
  clienteController
}

export {
  UsuarioController,
  FornecedorController,
  CategoriaController,
  ProdutoController,
  EntradaController,
  ClienteController
}