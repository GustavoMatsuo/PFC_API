import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "./Empresa"
import { Produto } from "./Produto"

@Entity('estoque')
export class Estoque {
  @PrimaryGeneratedColumn("uuid")
  id_estoque:string

  @OneToOne(() => Produto)
  @JoinColumn({ name: 'produto' })
  produto:string

  @Column()
  qtd:number 

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa:string

  @Column()
  empresa_id:string

  constructor(props: Omit<Estoque, 'id_estoque'>) {
    Object.assign(this, props)
  }
}