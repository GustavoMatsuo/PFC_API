import { IBasicCRUD } from "./Services/IBasicCRUD"
import { IFornecedorServices } from "./Services/IFornecedorServices"
import { IProdutoServices } from "./Services/IProdutoServices"
import { IUsuarioServices, loginType } from "./Services/IUsuarioServices"
import { IEntradaServices } from "./Services/IEntradaServices"
import { IClienteServices } from "./Services/IClienteServices"
import { ISaidaServices } from "./Services/ISaidaServices"
import { IEstoqueServices } from "./Services/IEstoqueServices"
import { IVendaServices } from "./Services/IVendaServices"
import { IEmpresaServices } from "./Services/IEmpresaServices"
import { IAnuncioServices } from "./Services/IAnuncioServices"
import { ICategoriaServices } from "./Services/ICategoriaServices"
import { IMailProvider, IMessage } from "./IMailProvider"

import { IAnuncioRepository } from "./Repositories/IAnuncioRepository"
import { ICategoriaRepository } from "./Repositories/ICategoriaRepository"
import { IUsuarioRepository } from "./Repositories/IUsuarioRepository"
import { IFornecedorRepository } from "./Repositories/IFornecedorRepository"
import { IProdutoRepository } from "./Repositories/IProdutoRepository"
import { IEntradaRepository } from "./Repositories/IEntradaRepository"
import { IClienteRepository } from "./Repositories/IClienteRepository"
import { ISaidaRepository } from "./Repositories/ISaidaRepository"
import { IEstoqueRepository } from "./Repositories/IEstoqueRepository"
import { IVendaRepository } from "./Repositories/IVendaRepository"
import { IEmpresaRepository } from "./Repositories/IEmpresaRepository"



export {
  //Services
  IBasicCRUD,
  IUsuarioServices,
  IFornecedorServices,
  IProdutoServices,
  IEntradaServices,
  IClienteServices,
  ISaidaServices,
  IEstoqueServices,
  IVendaServices,
  IEmpresaServices,
  IAnuncioServices,
  ICategoriaServices,
  //Repository
  IUsuarioRepository,
  IFornecedorRepository,
  IProdutoRepository,
  IEntradaRepository,
  IClienteRepository,
  ISaidaRepository,
  IEstoqueRepository,
  IVendaRepository,
  IEmpresaRepository,
  IAnuncioRepository,
  ICategoriaRepository,
  IMailProvider,
  IMessage
}

export {
  loginType,
}