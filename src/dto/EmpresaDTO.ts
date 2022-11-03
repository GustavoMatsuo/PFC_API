import { EnderecoDTO } from "./FornecedorDTO"

export class CreateEmpresaDTO {
  nome:string
  cnpj:number
  cel:number
  email:string
  endereco:EnderecoDTO
}

export class EnderecoUpdateDTO {
  id_endereco:string
  rua:string
  numero:string
  bairro:string
  cep:string
  cidade:string
  uf:string
}

export class UpdateEmpresaDTO {
  id_empresa:string
  nome:string
  cnpj:number
  cel:number
  email:string
  endereco:EnderecoUpdateDTO
  status:boolean
}