import { SimpleProdutoDTO } from "@dto/ProdutoDTO"
import { Produto } from "@models"

export interface IProdutoRepository {
  listProdutos(
    empresa:string,
    limitNum?:number, 
    skipNum?:number, 
    name?:string,
    order?:string,
    tags?:string[]
  ):Promise<{list: Produto[], total: number}>
  simpleList(empresa:string):Promise<SimpleProdutoDTO[]> 
  findByCodigo(codigo:string, empresa:string):Promise<Produto>
  findByNome(nome:string, empresa:string):Promise<Produto>
  findById(id:string, empresa:string):Promise<Produto>
  saveProduto(produto:Produto):Promise<Produto>
  updateProduto(produto:Produto):Promise<boolean>
}