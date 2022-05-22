export interface IEnderecoDTO {
  rua:string
  numero:string
  bairro:string
  cep:string
  cidade:string
  uf:string
}

export interface ICreateFornecedorDTO {
  nome:string
  email:string
  cnpj:string
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

export interface IUpdateFornecedorDTO {
  id_fornecedor:string
  nome:string
  email:string
  cnpj:string
  status:boolean
  endereco:IEnderecoUpdateDTO
}