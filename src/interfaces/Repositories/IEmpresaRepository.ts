import { Empresa, Endereco } from "@models"

export interface IEmpresaRepository {
  listEmpresa(
    limitNum?:number, 
    skipNum?:number, 
    filterBy?:string,
    order?:string,
    orderBy?:string
  ):Promise<{list: Empresa[], total: number}>
  findByCNPJ(cnpj:number):Promise<Empresa>
  findById(id:string):Promise<Empresa>
  saveEmpresa(empresa:Empresa):Promise<Empresa>
  updateEmpresa(empresa:Empresa, endereco:Endereco):Promise<boolean>
  updateEmpresaSimple(empresa:Empresa):Promise<boolean>
}