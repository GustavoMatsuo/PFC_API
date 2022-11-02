export class CreateCategoriaDTO {
  nome:string
  cor:string
  empresa:string
}

export class UpdateCategoriaDTO {
  id_categoria:string
  nome:string
  cor:string
  status:boolean
  empresa:string
}