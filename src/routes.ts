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
import { authMiddleware } from "@middleware/auth"

const router = Router()

//USUARIO
router.post('/usuario/login', (request, response) => {
  return usuarioController.login(request, response)
})
router.get('/usuario', authMiddleware, (request, response) => 
  usuarioController.index(request, response)
)
router.post('/usuario', authMiddleware, (request, response) => 
  usuarioController.create(request, response)
)
router.put('/usuario', authMiddleware, (request, response) => {
  return usuarioController.update(request, response)
})
router.put('/usuario/status', authMiddleware, (request, response) => {
  return usuarioController.changeStatus(request, response)
})
router.delete('/usuario', (request, response) => {
  return usuarioController.delete(request, response)
})

//FORNECEDOR
router.get('/fornecedor', authMiddleware, (request, response) =>
  fornecedorController.index(request, response)
)
router.post('/fornecedor', authMiddleware, (request, response) => {
  return fornecedorController.create(request, response)
})
router.put('/fornecedor', authMiddleware, (request, response) => {
  return fornecedorController.update(request, response)
})
router.put('/fornecedor/status', authMiddleware, (request, response) => {
  return fornecedorController.changeStatus(request, response)
})
router.get('/fornecedor/simple', authMiddleware, (request, response) => {
  return fornecedorController.simpleList(request, response)
})

//CATEGORIA
router.post('/categoria', authMiddleware, (request, response) => {
  return categoriaController.create(request, response)
})
router.get('/categoria', authMiddleware, (request, response) => {
  return categoriaController.read(request, response)
})
router.put('/categoria', authMiddleware, (request, response) => {
  return categoriaController.update(request, response)
})
router.delete('/categoria', authMiddleware, (request, response) => {
  return categoriaController.delete(request, response)
})
router.get('/categoria/list', authMiddleware, (request, response) => {
  return categoriaController.index(request, response)
})
router.get('/categoria/simple', authMiddleware, (request, response) => {
  return categoriaController.simpleList(request, response)
})
router.put('/categoria/status', authMiddleware, (request, response) => {
  return categoriaController.changeStatus(request, response)
})

//PRODUTO
router.get('/produto', authMiddleware, (request, response) => {
  return produtoController.index(request, response)
})
router.post('/produto', authMiddleware, (request, response) => {
  return produtoController.create(request, response)
})
router.put('/produto', authMiddleware, (request, response) => {
  return produtoController.update(request, response)
})
router.put('/produto/status', authMiddleware, (request, response) => {
  return produtoController.changeStatus(request, response)
})
router.get('/produto/simple', authMiddleware, (request, response) => {
  return produtoController.simpleList(request, response)
})

//ENTRADA
router.get('/entrada', authMiddleware, (request, response) => {
  return entradaController.index(request, response)
})
router.post('/entrada', authMiddleware, (request, response) => {
  return entradaController.create(request, response)
})

//CLIENTE
router.post('/cliente', authMiddleware, (request, response) => {
  return clienteController.create(request, response)
})
router.get('/cliente', authMiddleware, (request, response) => {
  return clienteController.read(request, response)
})
router.put('/cliente', authMiddleware, (request, response) => {
  return clienteController.update(request, response)
})
router.delete('/cliente', authMiddleware, (request, response) => {
  return clienteController.delete(request, response)
})
router.get('/cliente/list', authMiddleware, (request, response) => {
  return clienteController.index(request, response)
})

//SAIDA
router.get('/saida', authMiddleware, (request, response) => {
  return saidaController.index(request, response)
})
router.post('/saida', authMiddleware, (request, response) => {
  return saidaController.create(request, response)
})

//ESTOQUE
router.get('/estoque', authMiddleware, (request, response) => {
  return estoqueController.index(request, response)
})

//VENDA
router.get('/venda', authMiddleware, (request, response) => {
  return vendaController.index(request, response)
})
router.post('/venda', authMiddleware, (request, response) => {
  return vendaController.create(request, response)
})

export { router }