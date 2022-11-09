export interface IBasicCRUD {
  create(data:Object):Promise<void>
  read(id:string, empresa:string):Promise<object>
  update(data:object):Promise<any>
  delete(id:string, empresa:string):Promise<any>
  index(empresa:string, limit?:string, skip?:string):Promise<Array<any>>
}