import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id_categoria:string

  @Column()
  nome:string

  @Column()
  status:boolean

  @Column({ nullable: true })
  cor:string

  constructor(props: Omit<Categoria, 'id_categoria'>) {
    Object.assign(this, props)
  }
}