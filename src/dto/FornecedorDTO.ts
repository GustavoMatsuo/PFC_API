export class EnderecoDTO {
  rua:string
  numero:string
  bairro:string
  cep:string
  cidade:string
  uf:string
}

export class CreateFornecedorDTO {
  nome:string
  email:string
  cnpj:number
  endereco:EnderecoDTO
  empresa:string
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

export class UpdateFornecedorDTO {
  id_fornecedor:string
  nome:string
  email:string
  cnpj:number
  status:boolean
  endereco:EnderecoUpdateDTO
  empresa:string
}