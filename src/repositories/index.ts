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
import { EnderecoRepository } from "./EnderecoRepository"
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
const enderecoRepository = db.getRepository(Endereco)
const fornecedorRepository = db.getRepository(Fornecedor)
const produtoRepository = db.getRepository(Produto)
const entradaRepository = db.getRepository(Entrada)
const saidaRepository = db.getRepository(Saida)
const estoqueRepository = db.getRepository(Estoque)
const vendaRepository = db.getRepository(Venda)
const empresaRepository = db.getRepository(Empresa)

export {
  usuarioRepository,
  enderecoRepository,
  fornecedorRepository,
  produtoRepository,
  entradaRepository,
  saidaRepository,
  estoqueRepository,
  vendaRepository,
  empresaRepository,
}

export {
  UsuarioRepository,
  EnderecoRepository,
  FornecedorRepository,
  ProdutoRepository,
  EntradaRepository,
  SaidaRepository,
  EstoqueRepository,
  VendaRepository,
  EmpresaRepository,
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

export {
  categoriaRepository,
  anuncioRepository,
  clienteRepository
}