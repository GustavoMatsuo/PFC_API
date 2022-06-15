import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid'
import { Produto } from "./Produto"

@Entity('estoque')
export class Estoque {
  @PrimaryColumn()
  id_estoque:string

  @OneToOne(() => Produto)
  @JoinColumn({ name: 'produto_estoque' })
  produto:string

  @Column()
  qtd:string 

  constructor(props: Omit<Estoque, 'id_estoque'>, id_estoque?:string) {
    Object.assign(this, props)
    if (!id_estoque) {
      this.id_estoque = uuidv4()
    }
  }
}