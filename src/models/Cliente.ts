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
  @JoinColumn({ name: 'empresaId' })
  empresa:string

  @Column()
  empresaId:string

  constructor(props: Omit<Cliente, 'id_cliente'>) {
    Object.assign(this, props)
  }
}