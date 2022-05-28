import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid'

@Entity('categoria')
export class Categoria {
  @PrimaryColumn()
  id_categoria:string

  @Column()
  nome:string

  @Column()
  status:boolean

  @Column({ nullable: true })
  cor:string

  constructor(props: Omit<Categoria, 'id_categoria'>, id_categoria?:string) {
    Object.assign(this, props)
    if (!id_categoria) {
      this.id_categoria = uuidv4()
    }
  }
}