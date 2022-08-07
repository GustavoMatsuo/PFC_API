import { IEnderecoDTO } from "./FornecedorDTO"

export interface ICreateEmpresaDTO {
  nome:string
  cnpj:number
  cel:number
  email:string
  endereco:IEnderecoDTO
}

export interface IEnderecoUpdateDTO {
  id_endereco:string
  rua:string
  numero:string
  bairro:string
  cep:string
  cidade:string
  uf:string
}

export interface IUpdateEmpresaDTO {
  id_empresa:string
  nome:string
  cnpj:number
  cel:number
  email:string
  endereco:IEnderecoUpdateDTO
  status:boolean
}