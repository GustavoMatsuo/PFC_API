import { Categoria, Endereco, Fornecedor } from "@models"
import { ICategoriaServices } from "src/interfaces/ICategoriaServices"
import { CategoriaRepository } from "@repositories"
import { ICreateCategoriaDTO, IUpdateCategoriaDTO } from "@dto/CategoriaDTO"

export class CategoriaServices implements ICategoriaServices {
  private categoriaRepository: CategoriaRepository

  constructor(categoriaRepository:CategoriaRepository) {
    this.categoriaRepository = categoriaRepository
  }

  async create(data:ICreateCategoriaDTO):Promise<void> {
    const categoriaAlreadyExists = await this.categoriaRepository.findOneBy({
      nome: data.nome
    })

    if (categoriaAlreadyExists) {
      throw new Error('Categoria already exists.')
    }
    const categoria = new Categoria({...data, status: true})

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
      throw new Error('Categoria not found.')
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

  async simpleList():Promise<Array<Object>> {
    const categoriaList = await this.categoriaRepository
      .createQueryBuilder("categoria")
      .select("categoria.id_categoria")
      .addSelect("categoria.nome")
      .getMany()

    return categoriaList
  }

  async changeStatus(id:string):Promise<void> {
    let categoriaExists = await this.categoriaRepository.findOneBy({id_categoria: id})

    if (!categoriaExists) {
      throw new Error('Categoria not found.')
    }

    categoriaExists.status = !categoriaExists.status

    await this.categoriaRepository.update(id, categoriaExists)
  }
}
