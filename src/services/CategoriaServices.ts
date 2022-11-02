import { Categoria } from "@models"
import { ICategoriaServices } from "@interfaces"
import { CreateCategoriaDTO, UpdateCategoriaDTO } from "@dto/CategoriaDTO"
import { ICategoriaRepository } from "src/interfaces/Repositories/ICategoriaRepository"

export class CategoriaServices implements ICategoriaServices {
  private categoriaRepository: ICategoriaRepository

  constructor(categoriaRepository:ICategoriaRepository) {
    this.categoriaRepository = categoriaRepository
  }

  async create(data:CreateCategoriaDTO):Promise<void> {
    const categoriaAlreadyExists = await this.categoriaRepository.findByNome(
      data.nome, 
      data.empresa
    )

    if (categoriaAlreadyExists) {
      throw new Error('Categoria already exists.')
    }

    const categoria = new Categoria({
      ...data, 
      status: true, 
      empresa_id: data.empresa
    })

    await this.categoriaRepository.saveCategoria(categoria)
  }

  async read(id:string, empresa:string):Promise<Categoria> {
    const categoria = await this.categoriaRepository.findById(id, empresa)

    return categoria
  }

  async update(data:UpdateCategoriaDTO):Promise<void> {
    const categoriaExists = await this.categoriaRepository.findById(
      data.id_categoria, 
      data.empresa
    )

    if (!categoriaExists) {
      throw new Error('Categoria not found.')
    }

    const categoria = new Categoria({
      ...data, 
      empresa_id: data.empresa
    })

    await this.categoriaRepository.updateCategoria(categoria)
  }

  async delete(id:string, empresa:string):Promise<void> {
    const categoriaExists = await this.categoriaRepository.findById(id, empresa)

    if (!categoriaExists) {
      throw new Error('Categoria not found.')
    }

    await this.categoriaRepository.delete(categoriaExists.id_categoria)
  }

  async index(empresa:string):Promise<Array<Categoria>> {
    const categoriaList = await this.categoriaRepository.listCategoria(empresa)

    return categoriaList
  }

  async simpleList(empresa:string):Promise<Array<Object>> {
    const categoriaList = await this.categoriaRepository.simpleList(empresa)

    return categoriaList
  }

  async changeStatus(id:string, empresa:string):Promise<void> {
    let categoriaExists = await this.categoriaRepository.findById( id,empresa)

    if (!categoriaExists) {
      throw new Error('Categoria not found.')
    }

    categoriaExists.status = !categoriaExists.status

    await this.categoriaRepository.updateCategoria(categoriaExists)
  }
}
