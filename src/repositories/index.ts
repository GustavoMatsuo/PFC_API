import {
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
import { VendaRepository } from "./VendaRepository"
import { EmpresaRepository } from "./EmpresaRepository"

const usuarioRepository = db.getRepository(Usuario)
const enderecoRepository = db.getRepository(Endereco)
const fornecedorRepository = db.getRepository(Fornecedor)
const categoriaRepository = db.getRepository(Categoria)
const produtoRepository = db.getRepository(Produto)
const entradaRepository = db.getRepository(Entrada)
const clienteRepository = db.getRepository(Cliente)
const saidaRepository = db.getRepository(Saida)
const estoqueRepository = db.getRepository(Estoque)
const vendaRepository = db.getRepository(Venda)
const empresaRepository = db.getRepository(Empresa)

export {
  usuarioRepository,
  enderecoRepository,
  fornecedorRepository,
  categoriaRepository,
  produtoRepository,
  entradaRepository,
  clienteRepository,
  saidaRepository,
  estoqueRepository,
  vendaRepository,
  empresaRepository
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
  EstoqueRepository,
  VendaRepository,
  EmpresaRepository
}