import { Categoria } from "@models"
import { CategoriaServices } from "./CategoriaServices"
import { CategoriaController } from "./CategoriaController"
import { db } from '../../config/database'

const categoriaRepository = db.getRepository(Categoria)

const categoriaServices = new CategoriaServices(
  categoriaRepository
)

const categoriaController = new CategoriaController(
  categoriaServices
)

export { categoriaServices, categoriaController }