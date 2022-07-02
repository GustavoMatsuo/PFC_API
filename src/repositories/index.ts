import {
  Categoria, 
  Cliente, 
  Endereco, 
  Entrada, 
  Estoque, 
  Fornecedor, 
  Produto, 
  Saida, 
  Usuario
} from "@models"
import { db } from "@config/database"
import { CategoriaRepository } from "./CategoriaRepository"
import { EnderecoRepository } from "./EnderecoRepository"
import { FornecedorRepository } from "./FornecedorRepository"
import { ProdutoRepository } from "./ProdutoRepository"
import { UsuarioRepository } from "./UsuarioRepository"
import { EntradaRepository } from "./EntradaRepository"
import { ClienteRepository } from "./ClienteRepository"
import { SaidaRepository } from "./SaidaRepository"
import { EstoqueRepository } from "./EstoqueRepository"

const usuarioRepository = db.getRepository(Usuario)
const enderecoRepository = db.getRepository(Endereco)
const fornecedorRepository = db.getRepository(Fornecedor)
const categoriaRepository = db.getRepository(Categoria)
const produtoRepository = db.getRepository(Produto)
const entradaRepository = db.getRepository(Entrada)
const clienteRepository = db.getRepository(Cliente)
const saidaRepository = db.getRepository(Saida)
const estoqueRepository = db.getRepository(Estoque)

export {
  usuarioRepository,
  enderecoRepository,
  fornecedorRepository,
  categoriaRepository,
  produtoRepository,
  entradaRepository,
  clienteRepository,
  saidaRepository,
  estoqueRepository
}

export {
  UsuarioRepository,
  EnderecoRepository,
  FornecedorRepository,
  CategoriaRepository,
  ProdutoRepository,
  EntradaRepository,
  ClienteRepository,
  SaidaRepository,
  EstoqueRepository
}