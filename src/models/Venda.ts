import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cliente } from "./Cliente"
import { Empresa } from "./Empresa"
import { Usuario } from "./Usuario"

@Entity('venda')
export class Venda {
  @PrimaryGeneratedColumn('uuid')
  id_venda:string

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario:string

  @Column()
  usuario_id:string

  @ManyToOne(() => Cliente, cliente => cliente.id_cliente)
  @JoinColumn({ name: 'cliente' })
  cliente:string

  @Column('datetime')
  data_venda:Date

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa:string

  @Column()
  empresa_id:string

  constructor(props: Omit<Venda, 'id_venda'>) {
    Object.assign(this, props)
  }
}