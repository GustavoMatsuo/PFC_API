export interface IBasicCRUD {
  create(data:Object):Promise<void>
  read(id:string):Promise<object>
  update(data:object):Promise<void>
  delete(id:string):Promise<void>
  index(limit?:string, skip?: string):Promise<Array<any>>
}