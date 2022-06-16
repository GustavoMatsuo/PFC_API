import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid'
import { Cliente } from "./Cliente"
import { Produto } from "./Produto"

@Entity('saida')
export class Saida {
  @PrimaryColumn()
  id_saida:string

  @ManyToOne(() => Produto, produto => produto.id_produto)
  @JoinColumn({ name: 'produto' })
  produto:string

  @Column('timestamptz')
  data_saida:Date

  @Column()
  qtd:number

  @Column("decimal", { scale: 2 })
  valor_unitario:number

  @ManyToOne(() => Cliente, cliente => cliente.id_cliente)
  @JoinColumn({ name: 'cliente' })
  cliente:string

  constructor(props: Omit<Saida, 'id_saida'>, id_saida?:string) {
    Object.assign(this, props)
    if (!id_saida) {
      this.id_saida = uuidv4()
    }
  }
}