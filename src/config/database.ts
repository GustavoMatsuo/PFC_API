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
  Saida,
  Venda,
  Empresa,
  Anuncio
} from "@models"

const db = new DataSource({
  type: "mssql",
  host: "tag-project.database.windows.net",
  port: 1433,//Number.parseInt(process.env.POSTGRES_PORT),
  username: "tag-root",//String(process.env.POSTGRES_USER),
  password: "Db123@pass",//String(process.env.POSTGRES_PASSWORD),
  database: "tag",
  entities: [
    Usuario,
    Endereco,
    Fornecedor,
    Categoria,
    Produto,
    Entrada,
    Estoque,
    Cliente,
    Saida,
    Venda,
    Empresa,
    Anuncio
  ],
  synchronize: true,
  logging: false,
})

db.initialize()
  .then(() => console.log("Database connected!"))
  .catch((error) => console.log(error))

export { db }