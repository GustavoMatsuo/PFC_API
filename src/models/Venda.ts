import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cliente } from "./Cliente"

@Entity('venda')
export class Venda {
  @PrimaryGeneratedColumn('uuid')
  id_venda:string

  @ManyToOne(() => Cliente, cliente => cliente.id_cliente)
  @JoinColumn({ name: 'cliente' })
  cliente:string

  @Column('timestamptz')
  data_venda:Date

  constructor(props: Omit<Venda, 'id_venda'>) {
    Object.assign(this, props)
  }
}