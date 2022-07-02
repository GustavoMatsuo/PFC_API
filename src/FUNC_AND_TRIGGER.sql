-----------------PROCEDURE-----------------
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
    INSERT INTO estoque (produto, qtd) values (NEW.produto, NEW.qtd);
    RETURN NEW;
  END IF; 
    RETURN NULL;
END $entrada$

LANGUAGE plpgsql

-----------------------------------------

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
    INSERT INTO estoque (produto, qtd) values (NEW.produto, NEW.qtd);
    RETURN NEW;
  END IF; 
    RETURN NULL;
END $saida$

LANGUAGE plpgsql

-----------------TRIGGER-----------------
CREATE TRIGGER entrada
AFTER INSERT ON entrada
  FOR EACH ROW EXECUTE PROCEDURE SP_AtualizaEstoque_entrada();

CREATE TRIGGER saida
AFTER INSERT ON saida
  FOR EACH ROW EXECUTE PROCEDURE SP_AtualizaEstoque_saida();