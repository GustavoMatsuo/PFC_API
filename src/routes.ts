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
  vendaController,
  empresaController
} from "@controllers"
import { authMiddleware } from "@middleware/auth"

const router = Router()

//USUARIO
router.route('/usuario')
  .all(authMiddleware)
  .get((request, response) => usuarioController.index(request, response))
  .post((request, response) => usuarioController.create(request, response))
  .put((request, response) => usuarioController.update(request, response))
router.route('/usuario/auth')
  .all(authMiddleware)
  .post((request, response) => response.status(200).json({msg: "success"}))
router.route('/usuario/first')
  .post((request, response) => usuarioController.reset(request, response))
router.route('/usuario/login')
  .all(authMiddleware)
  .post((request, response) => usuarioController.login(request, response))
router.route('/usuario/reset')
  .all(authMiddleware)
  .post((request, response) => usuarioController.reset(request, response))
router.route('/usuario/newPassword')
  .put((request, response) => usuarioController.reset(request, response))
router.route('/usuario/status')
  .put((request, response) => usuarioController.changeStatus(request, response))

//FORNECEDOR
router.route('/fornecedor')
  .all(authMiddleware)
  .get((request, response) => fornecedorController.index(request, response))
  .post((request, response) => fornecedorController.create(request, response))
  .put((request, response) => fornecedorController.update(request, response))
router.route('/fornecedor/status')
  .all(authMiddleware)
  .put((request, response) => fornecedorController.changeStatus(request, response))
router.route('/fornecedor/simple')
  .all(authMiddleware)
  .put((request, response) => fornecedorController.simpleList(request, response))

//CATEGORIA
router.route('/categoria')
  .all(authMiddleware)
  .get((request, response) => categoriaController.read(request, response))
  .post((request, response) => categoriaController.create(request, response))
  .put((request, response) => categoriaController.update(request, response))
  .delete((request, response) => categoriaController.delete(request, response))
router.route('/categoria/list')
  .all(authMiddleware)
  .get((request, response) => categoriaController.index(request, response))
router.route('/categoria/simple')
  .all(authMiddleware)
  .get((request, response) => categoriaController.simpleList(request, response))
router.route('/categoria/status')
  .all(authMiddleware)
  .put((request, response) => categoriaController.changeStatus(request, response))

//PRODUTO
router.route('/produto')
  .all(authMiddleware)
  .get((request, response) => produtoController.index(request, response))
  .post((request, response) => produtoController.create(request, response))
  .put((request, response) => produtoController.update(request, response))
router.route('/produto/simple')
  .all(authMiddleware)
  .get((request, response) => produtoController.simpleList(request, response))
router.route('/produto/status')
  .all(authMiddleware)
  .put((request, response) => produtoController.changeStatus(request, response))

//ENTRADA
router.route('/entrada')
  .all(authMiddleware)
  .get((request, response) => entradaController.index(request, response))
  .post((request, response) => entradaController.create(request, response))

//CLIENTE
router.route('/cliente')
  .all(authMiddleware)
  .get((request, response) => clienteController.read(request, response))
  .post((request, response) => clienteController.create(request, response))
  .put((request, response) => clienteController.update(request, response))
  .delete((request, response) => clienteController.delete(request, response))
router.route('/cliente/list')
  .all(authMiddleware)
  .get((request, response) => clienteController.index(request, response))

//SAIDA
router.route('/saida')
  .all(authMiddleware)
  .get((request, response) => saidaController.index(request, response))
  .post((request, response) => saidaController.create(request, response))

//ESTOQUE
router.route('/estoque')
  .all(authMiddleware)
  .get((request, response) => estoqueController.index(request, response))

//VENDA
router.route('/venda')
  .all(authMiddleware)
  .get((request, response) => vendaController.index(request, response))
  .post((request, response) => vendaController.create(request, response))

//EMPRESA
router.route('/empresa')
  // .all(authMiddleware)
  .get((request, response) => empresaController.index(request, response))
  .post((request, response) => empresaController.create(request, response))
  .put((request, response) => empresaController.update(request, response))
router.route('/empresa/status')
  // .all(authMiddleware)
  .put((request, response) => empresaController.changeStatus(request, response))

export { router }