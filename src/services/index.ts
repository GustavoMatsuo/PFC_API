import { 
  categoriaRepository,
  fornecedorRepository,
  produtoRepository,
  usuarioRepository,
  entradaRepository,
  clienteRepository,
  saidaRepository,
  estoqueRepository
} from "@repositories" 
import { UsuarioServices } from "./UsuarioServices"
import { FornecedorServices } from "./FornecedorServices"
import { CategoriaServices } from "./CategoriaServices"
import { ProdutoServices } from "./ProdutoServices"
import { EntradaServices } from "./EntradaServices"
import { ClienteServices } from "./ClienteServices"
import { SaidaServices } from "./SaidaServices"
import { EstoqueServices } from "./EstoqueServices"

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
const saidaServices = new SaidaServices(saidaRepository)
const estoqueServices = new EstoqueServices(estoqueRepository)

export { 
  usuarioServices,
  fornecedorServices,
  categoriaServices,
  produtoServices,
  entradaServices,
  clienteServices,
  saidaServices,
  estoqueServices
}