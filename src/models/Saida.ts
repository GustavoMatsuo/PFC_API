import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid'
import { Produto } from "./Produto"
import { Venda } from "./Venda"

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

  @ManyToOne(() => Venda, venda => venda.id_venda, { nullable: true })
  @JoinColumn({ name: 'venda' })
  venda:string

  constructor(props: Omit<Saida, 'id_saida'>, id_saida?:string) {
    Object.assign(this, props)
    if (!id_saida) {
      this.id_saida = uuidv4()
    }
  }
}