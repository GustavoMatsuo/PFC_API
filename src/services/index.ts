import { UsuarioServices } from "./UsuarioServices"
import { FornecedorServices } from "./FornecedorServices"
import { CategoriaServices } from "./CategoriaServices"
import { ProdutoServices } from "./ProdutoServices"
import { EntradaServices } from "./EntradaServices"
import { ClienteServices } from "./ClienteServices"
import { 
  categoriaRepository,
  fornecedorRepository,
  produtoRepository,
  usuarioRepository,
  entradaRepository,
  clienteRepository
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
const clienteServices = new ClienteServices(clienteRepository)

export { 
  usuarioServices,
  fornecedorServices,
  categoriaServices,
  produtoServices,
  entradaServices,
  clienteServices
}

export {
  UsuarioServices,
  FornecedorServices,
  CategoriaServices,
  ProdutoServices,
  EntradaServices,
  ClienteServices
}