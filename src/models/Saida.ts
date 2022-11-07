import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "./Empresa"
import { Produto } from "./Produto"
import { Venda } from "./Venda"

@Entity('saida')
export class Saida {
  @PrimaryGeneratedColumn('uuid')
  id_saida:string

  @ManyToOne(() => Produto, produto => produto.id_produto)
  @JoinColumn({ name: 'produto' })
  produto:Produto

  @Column('timestamptz')
  data_saida:Date

  @Column()
  qtd:number

  @Column("decimal", { scale: 2 })
  valor_unitario:number

  @Column("decimal", { scale: 2, nullable: true })
  desconto:number

  @ManyToOne(() => Venda, venda => venda.id_venda, { nullable: true })
  @JoinColumn({ name: 'venda' })
  venda:Venda

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa:Empresa

  @Column()
  empresa_id:string

  constructor(props: Omit<Saida, 'id_saida'>) {
    Object.assign(this, props)
  }
}