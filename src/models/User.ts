import { UserRole } from "@enum/userRole"
import { Column, Entity, PrimaryColumn,  } from "typeorm"
import { v4 as uuidv4 } from 'uuid'

@Entity('user')
export class User {
  @PrimaryColumn()
  id:string

  @Column()
  status:boolean

  @Column()
  name:string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.EMP
  })
  role:string

  @Column()
  email:string

  @Column()
  password:string

  constructor(props: Omit<User, 'id'>, id?:string) {
    Object.assign(this, props)
    if (!id) {
      this.id = uuidv4()
    }
  }
}