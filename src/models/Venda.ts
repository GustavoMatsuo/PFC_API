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
  usuario:Usuario

  @Column()
  usuario_id:string

  @ManyToOne(() => Cliente, cliente => cliente.id_cliente)
  @JoinColumn({ name: 'cliente' })
  cliente:Cliente

  @Column('timestamptz')
  data_venda:Date

  @ManyToOne(() => Empresa, empresa => empresa.id_empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa:Empresa

  @Column()
  empresa_id:string

  constructor(props: Omit<Venda, 'id_venda'>) {
    Object.assign(this, props)
  }
}