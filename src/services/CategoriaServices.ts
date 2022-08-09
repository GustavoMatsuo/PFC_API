import { Categoria } from "@models"
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
      nome: data.nome,
      empresaId: data.empresa
    })

    if (categoriaAlreadyExists) {
      throw new Error('Categoria already exists.')
    }
    const categoria = new Categoria({
      ...data, 
      status: true, 
      empresaId: data.empresa
    })

    await this.categoriaRepository.save(categoria)
  }

  async read(id:string, empresa:string):Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({
      id_categoria: id,
      empresaId: empresa
    })

    return categoria
  }

  async update(data:IUpdateCategoriaDTO):Promise<void> {
    const categoriaExists = await this.categoriaRepository.findOneBy({
      id_categoria: data.id_categoria,
      empresaId: data.empresa
    })

    if (!categoriaExists) {
      throw new Error('Categoria not found.')
    }

    await this.categoriaRepository.update(data.id_categoria, {...data, empresaId: data.empresa})
  }

  async delete(id:string, empresa:string):Promise<void> {
    const categoriaExists = await this.categoriaRepository.findOneBy({
      id_categoria: id, 
      empresaId: empresa
    })

    if (!categoriaExists) {
      throw new Error('Categoria not found.')
    }

    await this.categoriaRepository.delete(categoriaExists.id_categoria)
  }

  async index():Promise<Array<Categoria>> {
    const categoriaList = await this.categoriaRepository.find()

    return categoriaList
  }

  async simpleList(empresa:string):Promise<Array<Object>> {
    const categoriaList = await this.categoriaRepository
      .createQueryBuilder("categoria")
      .select("categoria.id_categoria")
      .addSelect("categoria.nome")
      .where("categoria.empresaId = :empresa", { empresa })
      .getMany()

    return categoriaList
  }

  async changeStatus(id:string, empresa:string):Promise<void> {
    let categoriaExists = await this.categoriaRepository.findOneBy({
      id_categoria: id,
      empresaId: empresa
    })

    if (!categoriaExists) {
      throw new Error('Categoria not found.')
    }

    categoriaExists.status = !categoriaExists.status

    await this.categoriaRepository.update(id, categoriaExists)
  }
}
