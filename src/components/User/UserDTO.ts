export interface ICreateUserRequestDTO {
  name:string
  email:string
  role:string
  password:string
}

export interface IUpdateUserRequestDTO {
  id:string
  name:string
  status:boolean
  role:string
  email:string
  password:string
}

export interface ILoginUserRequestDTO {
  email:string
  password:string
}