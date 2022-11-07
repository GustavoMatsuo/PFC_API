import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "./Empresa"
import { Produto } from "./Produto"

@Entity('entrada')
export class Entrada {
  @PrimaryGeneratedColumn('uuid')
  id_entrada:string

  @ManyToOne(() => Produto, produto => produto.id_produto)
  @JoinColumn({ name: 'produto' })
  produto:Produto

  @Column()
  qtd:number

  @Column('timestamptz')
  data_entrada:Date

  @Column("decimal", { scale: 2 })
  valor_unitario:number

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa:Empresa

  @Column()
  empresa_id:string

  constructor(props: Omit<Entrada, 'id_entrada'>) {
    Object.assign(this, props)
  }
}