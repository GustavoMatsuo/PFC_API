import { 
  categoriaRepository,
  fornecedorRepository,
  produtoRepository,
  usuarioRepository,
  entradaRepository,
  clienteRepository,
  saidaRepository,
  estoqueRepository,
  vendaRepository,
  empresaRepository,
  anuncioRepository
} from "@repositories" 
import { UsuarioServices } from "./UsuarioServices"
import { FornecedorServices } from "./FornecedorServices"
import { CategoriaServices } from "./CategoriaServices"
import { ProdutoServices } from "./ProdutoServices"
import { EntradaServices } from "./EntradaServices"
import { ClienteServices } from "./ClienteServices"
import { SaidaServices } from "./SaidaServices"
import { EstoqueServices } from "./EstoqueServices"
import { VendaServices } from "./VendaServices"
import { EmpresaServices } from "./EmpresaServices"

import { MailtrapMailProvider } from "../providers/MailtrapMailProvider"
import { AnuncioServices } from "./AnuncioServices"

const mailProvider = new MailtrapMailProvider()

const usuarioServices = new UsuarioServices(usuarioRepository, mailProvider)
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
const vendaServices = new VendaServices(vendaRepository)
const empresaServices = new EmpresaServices(empresaRepository)
const anuncioServices = new AnuncioServices(anuncioRepository)

export { 
  usuarioServices,
  fornecedorServices,
  categoriaServices,
  produtoServices,
  entradaServices,
  clienteServices,
  saidaServices,
  estoqueServices,
  vendaServices,
  empresaServices,
  anuncioServices
}