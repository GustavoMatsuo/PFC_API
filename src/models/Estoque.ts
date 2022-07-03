import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
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

  constructor(props: Omit<Estoque, 'id_estoque'>) {
    Object.assign(this, props)
  }
}