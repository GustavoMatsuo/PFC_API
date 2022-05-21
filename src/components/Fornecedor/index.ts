import { Fornecedor } from "@models"
import { FornecedorServices } from "./FornecedorServices"
import { FornecedorController } from "./FornecedorController"
import { db } from '../../config/database'

const fornecedorRepository = db.getRepository(Fornecedor)

const fornecedorServices = new FornecedorServices(
  fornecedorRepository
)

const fornecedorController = new FornecedorController(
  fornecedorServices
)

export { fornecedorServices, fornecedorController }