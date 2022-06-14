import { UsuarioServices } from "./UsuarioServices"
import { FornecedorServices } from "./FornecedorServices"
import { CategoriaServices } from "./CategoriaServices"
import { ProdutoServices } from "./ProdutoServices"

import { 
  categoriaRepository,
  fornecedorRepository,
  produtoRepository,
  usuarioRepository 
} from "@repositories" 

const usuarioServices = new UsuarioServices(usuarioRepository)
const fornecedorServices = new FornecedorServices(fornecedorRepository)
const categoriaServices = new CategoriaServices(categoriaRepository)
const produtoServices = new ProdutoServices(
  produtoRepository, 
  fornecedorRepository, 
  categoriaRepository
)

export { 
  usuarioServices,
  fornecedorServices,
  categoriaServices,
  produtoServices
}

export {
  UsuarioServices,
  FornecedorServices,
  CategoriaServices,
  ProdutoServices
}