import { Router } from "express"
import { userController } from "./components/User"

const router = Router()

//USER
router.get('/users', (request, response) => {
  return userController.index(request, response)
})
router.post('/users', (request, response) => {
  return userController.create(request, response)
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

export { router }