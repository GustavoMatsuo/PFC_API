import { UserRole } from "@enum/userRole"
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "./Empresa"

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id_usuario:string

  @Column()
  status:boolean

  @Column()
  nome:string

  // @Check(`"name" IS NOT NULL AND "title" <> 'asd'`)
  @Column({
    type: "simple-enum",
    enum: UserRole
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