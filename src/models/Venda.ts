import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid'
import { Cliente } from "./Cliente"

@Entity('venda')
export class Venda {
  @PrimaryColumn()
  id_venda:string

  @ManyToOne(() => Cliente, cliente => cliente.id_cliente)
  @JoinColumn({ name: 'cliente' })
  cliente:string

  @Column('timestamptz')
  data_venda:Date

  constructor(props: Omit<Venda, 'id_venda'>, id_venda?:string) {
    Object.assign(this, props)
    if (!id_venda) {
      this.id_venda = uuidv4()
    }
  }
}