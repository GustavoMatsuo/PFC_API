import { CategoriaRepository } from "./CategoriaRepository"
import { EnderecoRepository } from "./EnderecoRepository"
import { FornecedorRepository } from "./FornecedorRepository"
import { ProdutoRepository } from "./ProdutoRepository"
import { UsersRepository } from "./UsersRepository"

import { db } from "@config/database"
import {
  Categoria, 
  Endereco, 
  Fornecedor, 
  Produto, 
  User
} from "@models"

const usersRepository = db.getRepository(User)
const enderecoRepository = db.getRepository(Endereco)
const fornecedorRepository = db.getRepository(Fornecedor)
const categoriaRepository = db.getRepository(Categoria)
const produtoRepository = db.getRepository(Produto)

export {
  usersRepository,
  enderecoRepository,
  fornecedorRepository,
  categoriaRepository,
  produtoRepository
}

export {
  UsersRepository,
  EnderecoRepository,
  FornecedorRepository,
  CategoriaRepository,
  ProdutoRepository
}