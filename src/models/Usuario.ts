import { UserRole } from "@enum/userRole"
import { Column, Entity, PrimaryColumn,  } from "typeorm"
import { v4 as uuidv4 } from 'uuid'

@Entity('usuario')
export class Usuario {
  @PrimaryColumn()
  id_usuario:string

  @Column()
  status:boolean

  @Column()
  nome:string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.EMP
  })
  cargo:string

  @Column()
  email:string

  @Column()
  senha:string

  constructor(props: Omit<Usuario, 'id_usuario'>, id_usuario?:string) {
    Object.assign(this, props)
    if (!id_usuario) {
      this.id_usuario = uuidv4()
    }
  }
}