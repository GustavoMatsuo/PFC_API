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
  texto:string

  @Column('timestamptz')
  data:Date

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario:string

  @Column()
  usuario_id:string

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa:string

  @Column()
  empresa_id:string

  constructor(props: Omit<Anuncio, 'id_anuncio'>) {
    Object.assign(this, props)
  }
}