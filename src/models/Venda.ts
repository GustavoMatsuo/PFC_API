import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cliente } from "./Cliente"
import { Empresa } from "./Empresa"

@Entity('venda')
export class Venda {
  @PrimaryGeneratedColumn('uuid')
  id_venda:string

  @ManyToOne(() => Cliente, cliente => cliente.id_cliente)
  @JoinColumn({ name: 'cliente' })
  cliente:string

  @Column('timestamptz')
  data_venda:Date

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresaId' })
  empresa:string

  @Column()
  empresaId:string

  constructor(props: Omit<Venda, 'id_venda'>) {
    Object.assign(this, props)
  }
}