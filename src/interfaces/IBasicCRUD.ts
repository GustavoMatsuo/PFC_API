export interface IBasicCRUD {
  create(data:Object):Promise<void>
  read(id:string, empresa:string):Promise<object>
  update(data:object):Promise<void>
  delete(id:string, empresa:string):Promise<void>
  index(empresa:string, limit?:string, skip?:string):Promise<Array<any>>
}