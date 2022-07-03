import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Endereco } from "./Endereco"

@Entity('fornecedor')
export class Fornecedor {
  @PrimaryGeneratedColumn('uuid')
  id_fornecedor:string

  @Column()
  nome:string

  @Column()
  email:string

  @Column()
  cnpj:string

  @Column()
  status:boolean

  @OneToOne(() => Endereco, {cascade: true})
  @JoinColumn({ name: 'endereco' })
  endereco:Endereco

  constructor(props: Omit<Fornecedor, 'id_fornecedor'>) {
    Object.assign(this, props)
  }
}