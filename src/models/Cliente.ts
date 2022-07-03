import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

  constructor(props: Omit<Cliente, 'id_cliente'>) {
    Object.assign(this, props)
  }
}