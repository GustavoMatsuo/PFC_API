export interface ICreateUsuarioDTO {
  nome:string
  email:string
  cargo:string
  senha:string
}

export interface IUpdateUsuarioDTO {
  id_usuario:string
  nome:string
  status:boolean
  cargo:string
  email:string
  senha:string
}

export interface ILoginUsuarioDTO {
  email:string
  senha:string
}
