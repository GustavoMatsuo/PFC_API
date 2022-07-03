import { Router } from "express"
import {
  usuarioController,
  fornecedorController,
  produtoController,
  categoriaController, 
  entradaController,
  clienteController,
  saidaController,
  estoqueController,
  vendaController
} from "@controllers"

const router = Router()

//USUARIO
router.get('/usuario', (request, response) => {
  return usuarioController.index(request, response)
})
router.post('/usuario', (request, response) => {
  return usuarioController.create(request, response)
})
router.post('/usuario/login', (request, response) => {
  return usuarioController.login(request, response)
})
router.put('/usuario', (request, response) => {
  return usuarioController.update(request, response)
})
router.put('/usuario/status', (request, response) => {
  return usuarioController.changeStatus(request, response)
})
router.delete('/usuario', (request, response) => {
  return usuarioController.delete(request, response)
})

//FORNECEDOR
router.get('/fornecedor', (request, response) => {
  return fornecedorController.index(request, response)
})
router.post('/fornecedor', (request, response) => {
  return fornecedorController.create(request, response)
})
router.put('/fornecedor', (request, response) => {
  return fornecedorController.update(request, response)
})
router.put('/fornecedor/status', (request, response) => {
  return fornecedorController.changeStatus(request, response)
})
router.get('/fornecedor/simple', (request, response) => {
  return fornecedorController.simpleList(request, response)
})

//CATEGORIA
router.post('/categoria', (request, response) => {
  return categoriaController.create(request, response)
})
router.get('/categoria', (request, response) => {
  return categoriaController.read(request, response)
})
router.put('/categoria', (request, response) => {
  return categoriaController.update(request, response)
})
router.delete('/categoria', (request, response) => {
  return categoriaController.delete(request, response)
})
router.get('/categoria/list', (request, response) => {
  return categoriaController.index(request, response)
})
router.get('/categoria/simple', (request, response) => {
  return categoriaController.simpleList(request, response)
})
router.put('/categoria/status', (request, response) => {
  return categoriaController.changeStatus(request, response)
})

//PRODUTO
router.get('/produto', (request, response) => {
  return produtoController.index(request, response)
})
router.post('/produto', (request, response) => {
  return produtoController.create(request, response)
})
router.put('/produto', (request, response) => {
  return produtoController.update(request, response)
})
router.put('/produto/status', (request, response) => {
  return produtoController.changeStatus(request, response)
})
router.get('/produto/simple', (request, response) => {
  return produtoController.simpleList(request, response)
})

//ENTRADA
router.get('/entrada', (request, response) => {
  return entradaController.index(request, response)
})
router.post('/entrada', (request, response) => {
  return entradaController.create(request, response)
})

//CLIENTE
router.post('/cliente', (request, response) => {
  return clienteController.create(request, response)
})
router.get('/cliente', (request, response) => {
  return clienteController.read(request, response)
})
router.put('/cliente', (request, response) => {
  return clienteController.update(request, response)
})
router.delete('/cliente', (request, response) => {
  return clienteController.delete(request, response)
})
router.get('/cliente/list', (request, response) => {
  return clienteController.index(request, response)
})

//SAIDA
router.get('/saida', (request, response) => {
  return saidaController.index(request, response)
})
router.post('/saida', (request, response) => {
  return saidaController.create(request, response)
})

//ESTOQUE
router.get('/estoque', (request, response) => {
  return estoqueController.index(request, response)
})

//VENDA
router.get('/venda', (request, response) => {
  return vendaController.index(request, response)
})
router.post('/venda', (request, response) => {
  return vendaController.create(request, response)
})

export { router }