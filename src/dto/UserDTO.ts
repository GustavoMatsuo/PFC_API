export interface ICreateUserDTO {
  name:string
  email:string
  role:string
  password:string
}

export interface IUpdateUserDTO {
  id:string
  name:string
  status:boolean
  role:string
  email:string
  password:string
}

export interface ILoginUserDTO {
  email:string
  password:string
}
