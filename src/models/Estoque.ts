import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid'
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

  constructor(props: Omit<Estoque, 'id_estoque'>, id_estoque?:string) {
    Object.assign(this, props)
    if (!id_estoque) {
      this.id_estoque = uuidv4()
    }
  }
}