import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid'
import { Produto } from "./Produto"

@Entity('entrada')
export class Entrada {
  @PrimaryColumn()
  id_entrada:string


  @ManyToOne(() => Produto, produto => produto.id_produto)
  @JoinColumn({ name: 'produto_categoria' })
  id_produto:string

  @Column()
  qtd:number

  @Column('timestamptz')
  data_entrada:Date

  @Column("decimal", { scale: 2 })
  valor_unitario:number

  constructor(props: Omit<Entrada, 'id_entrada'>, id_entrada?:string) {
    Object.assign(this, props)
    if (!id_entrada) {
      this.id_entrada = uuidv4()
    }
  }
}