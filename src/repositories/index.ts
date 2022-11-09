import {
  Anuncio,
  Categoria, 
  Cliente, 
  Empresa, 
  Entrada, 
  Estoque, 
  Fornecedor, 
  Produto, 
  Saida, 
  Usuario,
  Venda
} from "@models"
import { db } from "../config/database"
import { CategoriaRepository } from "./CategoriaRepository"
import { FornecedorRepository } from "./FornecedorRepository"
import { ProdutoRepository } from "./ProdutoRepository"
import { UsuarioRepository } from "./UsuarioRepository"
import { EntradaRepository } from "./EntradaRepository"
import { ClienteRepository } from "./ClienteRepository"
import { SaidaRepository } from "./SaidaRepository"
import { EstoqueRepository } from "./EstoqueRepository"
import { VendaRepository } from "./VendaRepository"
import { EmpresaRepository } from "./EmpresaRepository"
import { AnuncioRepository } from "./AnuncioRepository"

const categoriaRepository = new CategoriaRepository(
  db.getRepository(Categoria)
)
const anuncioRepository = new AnuncioRepository(
  db.getRepository(Anuncio)
)

const clienteRepository = new ClienteRepository(
  db.getRepository(Cliente)
)

const empresaRepository = new EmpresaRepository(
  db.getRepository(Empresa)
)

const fornecedorRepository = new FornecedorRepository(
  db.getRepository(Fornecedor)
)

const produtoRepository = new ProdutoRepository(
  db.getRepository(Produto)
)

const entradaRepository = new EntradaRepository(
  db.getRepository(Entrada)
)

const saidaRepository = new SaidaRepository(
  db.getRepository(Saida)
)

const vendaRepository = new VendaRepository (
  db.getRepository(Venda)
)

const estoqueRepository = new EstoqueRepository(
  db.getRepository(Estoque)
)

const usuarioRepository = new UsuarioRepository(
  db.getRepository(Usuario)
)

export {
  categoriaRepository,
  anuncioRepository,
  clienteRepository,
  empresaRepository,
  fornecedorRepository,
  produtoRepository,
  entradaRepository,
  saidaRepository,
  vendaRepository,
  estoqueRepository,
  usuarioRepository
}