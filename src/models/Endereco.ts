import { Column, Entity, PrimaryColumn,  } from "typeorm"
import { v4 as uuidv4 } from 'uuid'

@Entity('endereco')
export class Endereco {
  @PrimaryColumn()
  id_endereco:string

  @Column()
  rua:string

  @Column()
  numero:string

  @Column()
  bairro:string

  @Column()
  cep:string

  @Column()
  cidade:string

  @Column()
  uf:string

  constructor(props: Omit<Endereco, 'id_endereco'>, id_endereco?:string) {
    Object.assign(this, props)
    if (!id_endereco) {
      this.id_endereco = uuidv4()
    }
  }
}