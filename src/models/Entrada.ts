import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Produto } from "./Produto"

@Entity('entrada')
export class Entrada {
  @PrimaryGeneratedColumn('uuid')
  id_entrada:string

  @ManyToOne(() => Produto, produto => produto.id_produto)
  @JoinColumn({ name: 'produto' })
  produto:string

  @Column()
  qtd:number

  @Column('timestamptz')
  data_entrada:Date

  @Column("decimal", { scale: 2 })
  valor_unitario:number

  constructor(props: Omit<Entrada, 'id_entrada'>) {
    Object.assign(this, props)
  }
}