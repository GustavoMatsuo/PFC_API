import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('endereco')
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
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

  constructor(props: Omit<Endereco, 'id_endereco'>) {
    Object.assign(this, props)
  }
}