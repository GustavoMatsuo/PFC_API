import { Router } from "express"
import { categoriaController } from "./components/Categoria"
import { fornecedorController } from "./components/Fornecedor"
import { produtoController } from "./components/Produto"
import { userController } from "./components/User"

const router = Router()

//USER
router.get('/users', (request, response) => {
  return userController.index(request, response)
})
router.post('/users', (request, response) => {
  return userController.create(request, response)
})
router.post('/users/login', (request, response) => {
  return userController.login(request, response)
})
router.put('/users', (request, response) => {
  return userController.update(request, response)
})
router.put('/users/status', (request, response) => {
  return userController.changeStatus(request, response)
})
router.delete('/users', (request, response) => {
  return userController.delete(request, response)
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
router.put('/produto/updateEstoque', (request, response) => {
  return produtoController.updateEstoque(request, response)
})

export { router }