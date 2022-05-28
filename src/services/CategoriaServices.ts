import { Categoria, Endereco, Fornecedor } from "@models"
import { IBasicCRUD } from "@interfaces"
import { CategoriaRepository } from "@repositories"
import { ICreateCategoriaDTO, IUpdateCategoriaDTO } from "@dto/CategoriaDTO"
import { db } from "src/config/database"

export class CategoriaServices implements IBasicCRUD {
  private categoriaRepository: CategoriaRepository

  constructor(categoriaRepository:CategoriaRepository) {
    this.categoriaRepository = categoriaRepository
  }

  async create(data:ICreateCategoriaDTO):Promise<void> {
    const categoriaAlreadyExists = await this.categoriaRepository.findOneBy({
      nome: data.nome
    })

    if (categoriaAlreadyExists) {
      throw new Error('categoria already exists.')
    }
    const categoria = new Categoria({...data})

    await this.categoriaRepository.save(categoria)
  }

  async read(id:string):Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({
      id_categoria: id
    })

    return categoria
  }

  async update(data:IUpdateCategoriaDTO):Promise<void> {
    const categoriaExists = await this.categoriaRepository.findOneBy({
      id_categoria: data.id_categoria
    })

    if (!categoriaExists) {
      throw new Error('Categoria not found.')
    }

    await this.categoriaRepository.update(data.id_categoria, data)
  }

  async delete(id:string):Promise<void> {
    const categoriaExists = await this.categoriaRepository.findBy({id_categoria: id})

    if (!categoriaExists) {
      throw new Error('User not found.')
    }

    await this.categoriaRepository.delete(id)
  }

  async index(limit:string, skip:string):Promise<Array<Categoria>> {
    const limitNum = limit? Number.parseInt(limit) : null
    const skipNum = skip? Number.parseInt(skip) : null

    const categoriaList = await this.categoriaRepository.find({
      take: limitNum,
      skip: skipNum
    })

    return categoriaList
  }
}
