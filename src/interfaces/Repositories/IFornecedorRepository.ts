import { Endereco, Fornecedor } from "@models"

export interface IFornecedorRepository {
  listFornecedor(
    empresa:string,
    limitNum?:number, 
    skipNum?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<{list: Fornecedor[], total: number}>
  simpleList(empresa:string):Promise<Array<Object>> 
  findByCNPJ(cnpj:number, empresa:string):Promise<Fornecedor>
  findById(id:string, empresa:string):Promise<Fornecedor>
  saveFornecedor(fornecedor:Fornecedor):Promise<Fornecedor>
  updateFornecedor(fornecedor:Fornecedor, endereco:Endereco):Promise<boolean>
}