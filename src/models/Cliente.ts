import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid'

@Entity('cliente')
export class Cliente {
  @PrimaryColumn()
  id_cliente:string

  @Column()
  nome:string

  @Column({ type: 'bigint' })
  cpf:number

  @Column({ type: 'bigint' })
  cel:number

  constructor(props: Omit<Cliente, 'id_cliente'>, id_cliente?:string) {
    Object.assign(this, props)
    if (!id_cliente) {
      this.id_cliente = uuidv4()
    }
  }
}