import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Produto } from "./Produto"
import { Venda } from "./Venda"

@Entity('saida')
export class Saida {
  @PrimaryGeneratedColumn('uuid')
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

  @ManyToOne(() => Venda, venda => venda.id_venda, { nullable: true })
  @JoinColumn({ name: 'venda' })
  venda:string

  constructor(props: Omit<Saida, 'id_saida'>) {
    Object.assign(this, props)
  }
}