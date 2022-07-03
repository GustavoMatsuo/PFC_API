import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Categoria } from "./Categoria"
import { Fornecedor } from "./Fornecedor"

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id_produto:string

  @Column()
  nome:string

  @Column()
  status:boolean

  @Column()
  codigo:string

  @ManyToOne(() => Fornecedor, fornecedor => fornecedor.id_fornecedor)
  @JoinColumn({ name: 'fornecedor' })
  fornecedor:Fornecedor

  @Column()
  estoque_minimo:number

  @ManyToOne(() => Categoria, categoria => categoria.id_categoria)
  @JoinColumn({ name: 'categoria' })
  categoria:Categoria

  @Column("decimal", { scale: 2 })
  valor_unitario:number 

  constructor(props: Omit<Produto, 'id_produto'>) {
    Object.assign(this, props)
  }
}