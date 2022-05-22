import { Router } from "express"
import { fornecedorController } from "./components/Fornecedor"
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

export { router }