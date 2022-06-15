import { UsuarioServices } from "./UsuarioServices"
import { FornecedorServices } from "./FornecedorServices"
import { CategoriaServices } from "./CategoriaServices"
import { ProdutoServices } from "./ProdutoServices"
import { EntradaServices } from "./EntradaServices"

import { 
  categoriaRepository,
  fornecedorRepository,
  produtoRepository,
  usuarioRepository,
  entradaRepository
} from "@repositories" 

const usuarioServices = new UsuarioServices(usuarioRepository)
const fornecedorServices = new FornecedorServices(fornecedorRepository)
const categoriaServices = new CategoriaServices(categoriaRepository)
const produtoServices = new ProdutoServices(
  produtoRepository, 
  fornecedorRepository, 
  categoriaRepository
)
const entradaServices = new EntradaServices(entradaRepository)


export { 
  usuarioServices,
  fornecedorServices,
  categoriaServices,
  produtoServices,
  entradaServices
}

export {
  UsuarioServices,
  FornecedorServices,
  CategoriaServices,
  ProdutoServices,
  EntradaServices
}