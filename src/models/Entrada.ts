import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "./Empresa"
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

  @Column('datetime')
  data_entrada:Date

  @Column("decimal", { scale: 2 })
  valor_unitario:number

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa:string

  @Column()
  empresa_id:string

  constructor(props: Omit<Entrada, 'id_entrada'>) {
    Object.assign(this, props)
  }
}