import {
  Anuncio,
  Categoria, 
  Cliente, 
  Empresa, 
  Endereco, 
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

const usuarioRepository = db.getRepository(Usuario)
const entradaRepository = db.getRepository(Entrada)
const saidaRepository = db.getRepository(Saida)
const estoqueRepository = db.getRepository(Estoque)
const vendaRepository = db.getRepository(Venda)

export {
  usuarioRepository,
  entradaRepository,
  saidaRepository,
  estoqueRepository,
  vendaRepository,
}

export {
  UsuarioRepository,
  EntradaRepository,
  SaidaRepository,
  EstoqueRepository,
  VendaRepository,
}

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

export {
  categoriaRepository,
  anuncioRepository,
  clienteRepository,
  empresaRepository,
  fornecedorRepository,
  produtoRepository
}