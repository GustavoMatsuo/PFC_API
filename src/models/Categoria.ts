import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "./Empresa"

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

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresaId' })
  empresa:string

  @Column()
  empresaId:string

  constructor(props: Omit<Categoria, 'id_categoria'>) {
    Object.assign(this, props)
  }
}