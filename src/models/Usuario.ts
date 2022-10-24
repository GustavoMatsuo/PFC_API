import { UserRole } from "../enum/userRole"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "./Empresa"

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

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa:string

  @Column()
  empresa_id:string

  constructor(props: Omit<Usuario, 'id_usuario'>) {
    Object.assign(this, props)
  }
}