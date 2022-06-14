import "reflect-metadata"
import { DataSource } from "typeorm"
import { Endereco, Fornecedor, Usuario } from "@models"
import { Categoria } from "src/models/Categoria"
import { Produto } from "src/models/Produto"

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
    Produto
  ],
  synchronize: true,
  logging: false,
})

db.initialize()
  .then(() => console.log("Database connected!"))
  .catch((error) => console.log(error))

export { db }