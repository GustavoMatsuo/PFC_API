import { CategoriaRepository } from "./CategoriaRepository"
import { EnderecoRepository } from "./EnderecoRepository"
import { FornecedorRepository } from "./FornecedorRepository"
import { ProdutoRepository } from "./ProdutoRepository"
import { UsuarioRepository } from "./UsuarioRepository"

import { db } from "@config/database"
import {
  Categoria, 
  Endereco, 
  Fornecedor, 
  Produto, 
  Usuario
} from "@models"

const usuarioRepository = db.getRepository(Usuario)
const enderecoRepository = db.getRepository(Endereco)
const fornecedorRepository = db.getRepository(Fornecedor)
const categoriaRepository = db.getRepository(Categoria)
const produtoRepository = db.getRepository(Produto)

export {
  usuarioRepository,
  enderecoRepository,
  fornecedorRepository,
  categoriaRepository,
  produtoRepository
}

export {
  UsuarioRepository,
  EnderecoRepository,
  FornecedorRepository,
  CategoriaRepository,
  ProdutoRepository
}