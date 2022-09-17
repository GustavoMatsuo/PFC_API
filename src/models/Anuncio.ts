import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "./Empresa"
import { Usuario } from "./Usuario"

@Entity('anuncio')
export class Anuncio {
  @PrimaryGeneratedColumn('uuid')
  id_anuncio:string

  @Column()
  titulo:string

  @Column()
  texto:boolean

  @Column('timestamptz')
  data:Date

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario:string

  @Column()
  usuarioId:string

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresaId' })
  empresa:string

  @Column()
  empresaId:string

  constructor(props: Omit<Anuncio, 'id_anuncio'>) {
    Object.assign(this, props)
  }
}