import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "./Empresa"
import { Endereco } from "./Endereco"

@Entity('fornecedor')
export class Fornecedor {
  @PrimaryGeneratedColumn('uuid')
  id_fornecedor:string

  @Column()
  nome:string

  @Column()
  email:string

  @Column({ type: 'bigint' })
  cnpj:number

  @Column()
  status:boolean

  @OneToOne(() => Endereco, {cascade: true})
  @JoinColumn({ name: 'endereco' })
  endereco:Endereco

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresaId' })
  empresa:string

  @Column()
  empresaId:string

  constructor(props: Omit<Fornecedor, 'id_fornecedor'>) {
    Object.assign(this, props)
  }
}