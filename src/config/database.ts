import "reflect-metadata"
import { DataSource } from "typeorm"
import { 
  Usuario,
  Endereco, 
  Fornecedor, 
  Categoria,
  Produto,
  Entrada, 
  Estoque,
  Cliente,
  Saida
} from "@models"

const db = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5115,//Number.parseInt(process.env.POSTGRES_PORT),
  username: "postgres",//String(process.env.POSTGRES_USER),
  password: "changeme",//String(process.env.POSTGRES_PASSWORD),
  database: "postgres",
  entities: [
    Usuario,
    Endereco,
    Fornecedor,
    Categoria,
    Produto,
    Entrada,
    Estoque,
    Cliente,
    Saida
  ],
  synchronize: true,
  logging: false,
})

db.initialize()
  .then(() => console.log("Database connected!"))
  .catch((error) => console.log(error))

export { db }