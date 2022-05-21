import "reflect-metadata"
import { DataSource } from "typeorm"
import { Endereco, Fornecedor, User } from "@models"

const db = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5115,//Number.parseInt(process.env.POSTGRES_PORT),
  username: "postgres",//String(process.env.POSTGRES_USER),
  password: "changeme",//String(process.env.POSTGRES_PASSWORD),
  database: "postgres",
  entities: [User, Endereco, Fornecedor],
  synchronize: true,
  logging: false,
})

db.initialize()
  .then(() => console.log("Database connected!"))
  .catch((error) => console.log(error))

export { db }