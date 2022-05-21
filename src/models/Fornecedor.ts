import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn,  } from "typeorm"
import { v4 as uuidv4 } from 'uuid'
import { Endereco } from "./Endereco"

@Entity('fornecedor')
export class Fornecedor {
  @PrimaryColumn()
  id_fornecedor:string

  @Column()
  nome:string

  @Column()
  email:string

  @Column()
  cnpj:string

  @OneToOne(() => Endereco)
  endereco:Endereco

  constructor(props: Omit<Fornecedor, 'id_fornecedor'>, id_fornecedor?:string) {
    Object.assign(this, props)
    if (!id_fornecedor) {
      this.id_fornecedor = uuidv4()
    }
  }
}