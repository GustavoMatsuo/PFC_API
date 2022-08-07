import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Endereco } from "./Endereco"

@Entity('empresa')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id_empresa:string

  @Column()
  nome:string

  @Column({ type: 'bigint' })
  cnpj:number

  @Column({ type: 'bigint' })
  cel:number

  @Column()
  email:string

  @Column()
  status:boolean

  @OneToOne(() => Endereco, {cascade: true})
  @JoinColumn({ name: 'endereco' })
  endereco:Endereco

  constructor(props: Omit<Empresa, 'id_empresa'>) {
    Object.assign(this, props)
  }
}