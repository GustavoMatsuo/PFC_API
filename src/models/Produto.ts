import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid'
import { Categoria } from "./Categoria"
import { Fornecedor } from "./Fornecedor"

@Entity('produto')
export class Produto {
  @PrimaryColumn()
  id_produto:string

  @Column()
  nome:string

  @Column()
  status:boolean

  @ManyToOne(() => Fornecedor, fornecedor => fornecedor.id_fornecedor)
  @JoinColumn({ name: 'fornecedor_produto' })
  fornecedor:Fornecedor

  @Column()
  estoque_minimo:number

  @ManyToOne(() => Categoria, categoria => categoria.id_categoria)
  @JoinColumn({ name: 'categoria_produto' })
  categoria:Categoria

  @Column("decimal", { scale: 2 })
  valor_unitario:number 

  constructor(props: Omit<Produto, 'id_produto'>, id_produto?:string) {
    Object.assign(this, props)
    if (!id_produto) {
      this.id_produto = uuidv4()
    }
  }
}