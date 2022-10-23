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
  type: "postgres",
  host: "ec2-34-194-40-194.compute-1.amazonaws.com",
  port: Number.parseInt(process.env.POSTGRES_PORT),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DATABASE),
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
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
  .then((x) =>{
    x.query(`
      CREATE OR REPLACE FUNCTION SP_AtualizaEstoque_entrada()
      RETURNS trigger

      AS $entrada$  
      DECLARE  
        contador integer := 0;

      BEGIN  
        SELECT count(*) into contador FROM estoque WHERE produto = NEW.produto;

        IF contador > 0 THEN
          UPDATE estoque SET qtd = qtd + NEW.qtd WHERE produto = NEW.produto;
          RETURN NEW;
        ELSE
          INSERT INTO estoque (produto, qtd, empresa_id) 
            values (NEW.produto, NEW.qtd, NEW.produto.empresa_id);
          RETURN NEW;
        END IF; 
          RETURN NULL;
      END $entrada$

      LANGUAGE plpgsql
    `)
    x.query(`
      CREATE OR REPLACE FUNCTION SP_AtualizaEstoque_saida()
      RETURNS trigger
      
      AS $saida$  
      DECLARE  
        contador integer := 0;
      
      BEGIN  
        SELECT count(*) into contador FROM estoque WHERE produto = NEW.produto;
      
        IF contador > 0 THEN
          UPDATE estoque SET qtd = qtd + (NEW.qtd * -1) WHERE produto = NEW.produto;
          RETURN NEW;
        ELSE
          INSERT INTO estoque (produto, qtd, empresa_id) 
            values (NEW.produto, NEW.qtd, NEW.produto.empresa_id);
          RETURN NEW;
        END IF; 
          RETURN NULL;
      END $saida$
      
      LANGUAGE plpgsql
    `)
    x.query(`
      CREATE OR REPLACE FUNCTION SP_AtualizaEstoque_produto()
      RETURNS trigger
      
      AS $produto$  
      DECLARE  
        contador integer := 0;
      
      BEGIN  
        INSERT INTO estoque (produto, qtd, empresa_id) 
          values (NEW.id_produto, 0, NEW.empresa_id);
        RETURN NEW;
      END $produto$
      
      LANGUAGE plpgsql
    `)
    x.query(`
      CREATE  OR REPLACE TRIGGER entrada
      AFTER INSERT ON entrada
        FOR EACH ROW EXECUTE PROCEDURE SP_AtualizaEstoque_entrada();
      
      CREATE OR REPLACE TRIGGER saida
      AFTER INSERT ON saida
        FOR EACH ROW EXECUTE PROCEDURE SP_AtualizaEstoque_saida();
      
      CREATE OR REPLACE TRIGGER produto
      AFTER INSERT ON produto
        FOR EACH ROW EXECUTE PROCEDURE SP_AtualizaEstoque_produto();
    `)
    console.log("RUNNING PORT ==> " + process.env.PORT )
    console.log("DB STATUS ==> connected")
  })
  .catch((error) => console.log(error))

export { db }

/*
  type: "mssql",
  host: "tag-project.database.windows.net",
  port: 1433,//Number.parseInt(process.env.POSTGRES_PORT),
  username: "tag-root",//String(process.env.POSTGRES_USER),
  password: "Db123@pass",//String(process.env.POSTGRES_PASSWORD),
  database: "tag",
*/