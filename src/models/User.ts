import { UserRole } from "@enum/userRole"
import { Column, Entity, PrimaryColumn,  } from "typeorm"
import { v4 as uuidv4 } from 'uuid'

@Entity('user')
export class User {
  @PrimaryColumn()
  public id:string

  @Column()
  public status:boolean

  @Column()
  public name:string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.EMP
  })
  public role:string

  @Column()
  public email:string

  @Column()
  public password:string

  constructor(props: Omit<User, 'id'>, id?:string) {
    Object.assign(this, props)
    if (!id) {
      this.id = uuidv4()
    }
  }
}