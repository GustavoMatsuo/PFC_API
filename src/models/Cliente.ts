import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "./Empresa"

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id_cliente:string

  @Column()
  nome:string

  @Column({ type: 'bigint' })
  cpf:number

  @Column({ type: 'bigint' })
  cel:number

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa:Empresa

  @Column()
  empresa_id:string

  constructor(props: Omit<Cliente, 'id_cliente'>) {
    Object.assign(this, props)
  }
}