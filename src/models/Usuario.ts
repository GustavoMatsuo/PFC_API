import { UserRole } from "@enum/userRole"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
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

  constructor(props: Omit<Usuario, 'id_usuario'>) {
    Object.assign(this, props)
  }
}