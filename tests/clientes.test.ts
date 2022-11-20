import { DataSource } from "typeorm"
import { ClienteServices } from '../src/services/ClienteServices'
import { ClienteRepository } from '../src/repositories/ClienteRepository'
import { IClienteRepository } from '../src/interfaces/Repositories/IClienteRepository'
import { Cliente, Empresa, Endereco } from '../src/models'
import { CreateClienteDTO, UpdateClienteDTO } from '../src/dto/ClienteDTO'
import { v4 as uuidv4 } from 'uuid'

let connection:DataSource
const idEmpresaExist = "a4469429-0baa-45e0-8df7-e5130fd79d37"

beforeEach(async() => {
  connection = await new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5115,
    username: "postgres",
    password: "changeme",
    database: "postgres",
    entities: [
      Cliente,
      Empresa,
      Endereco
    ],
    synchronize: true,
    logging: false,
  }).initialize()
})

afterEach(() => {
  connection.destroy()
})

let idCliente = ""
const randomCFP = Math.floor(Math.random() * 100000000000)

it('should return list of Clientes', async() => {
  const clienteRepository:IClienteRepository = new ClienteRepository(connection.getRepository(Cliente))
  const cliente = new ClienteServices(clienteRepository)
  const clienteList = await cliente.index(idEmpresaExist)
  expect(Array.isArray(clienteList)).toBe(true)
})

it('should Create Clientes', async() => {
  const clienteRepository:IClienteRepository = new ClienteRepository(connection.getRepository(Cliente))
  const cliente = new ClienteServices(clienteRepository)
  const newClientDTO:CreateClienteDTO = {
    nome:"novo cliente",
    cpf:randomCFP,
    cel:3127677662,
    empresa:idEmpresaExist
  }
  const novoCliente:Cliente = await cliente.create(newClientDTO)
  idCliente = novoCliente.id_cliente
  expect(novoCliente.nome).toBe("novo cliente")
})

it('should Create Clientes Exist', async() => {
  const clienteRepository:IClienteRepository = new ClienteRepository(connection.getRepository(Cliente))
  const cliente = new ClienteServices(clienteRepository)
  const newClientDTO:CreateClienteDTO = {
    nome:"novo cliente",
    cpf:randomCFP,
    cel:3127677662,
    empresa:idEmpresaExist
  }
  let errorStrnig = ""
  try{
    await cliente.create(newClientDTO)
  } catch(err){
    errorStrnig = err.message
  } 
  expect(errorStrnig).toBe('Cliente already exists.')
})

it('should Upadte Clientes', async() => {
  const clienteRepository:IClienteRepository = new ClienteRepository(connection.getRepository(Cliente))
  const cliente = new ClienteServices(clienteRepository)
  const updateCliente:UpdateClienteDTO = {
    id_cliente: idCliente,
    nome:"novo cliente update",
    cpf:randomCFP,
    cel:3127677662,
    empresa:idEmpresaExist
  }
  const updated:boolean = await cliente.update(updateCliente)
  expect(updated).toBe(true)
})

it('should Upadte Clientes not found', async() => {
  const clienteRepository:IClienteRepository = new ClienteRepository(connection.getRepository(Cliente))
  const cliente = new ClienteServices(clienteRepository)
  const updateCliente:UpdateClienteDTO = {
    id_cliente: uuidv4(),
    nome:"novo cliente update",
    cpf:randomCFP,
    cel:3127677662,
    empresa: idEmpresaExist
  }
  let errorStrnig = ""
  try{
    await cliente.update(updateCliente)
  } catch(err){
    errorStrnig = err.message
  } 
  expect(errorStrnig).toBe('Cliente not found.')
})

it('should Read Clientes', async() => {
  const clienteRepository:IClienteRepository = new ClienteRepository(connection.getRepository(Cliente))
  const cliente = new ClienteServices(clienteRepository)

  const getCLiente:Cliente = await cliente.read(idCliente, idEmpresaExist)
  expect(getCLiente.nome).toBe("novo cliente update")
  expect(getCLiente.id_cliente).toBe(idCliente)
})

it('should Read Clientes not found', async() => {
  const clienteRepository:IClienteRepository = new ClienteRepository(connection.getRepository(Cliente))
  const cliente = new ClienteServices(clienteRepository)
  let errorStrnig = ""
  try{
    await cliente.read(uuidv4(), idEmpresaExist)
  } catch(err){
    errorStrnig = err.message
  } 
  expect(errorStrnig).toBe('Cliente not found.')
})

it('should Delete Clientes', async() => {
  const clienteRepository:IClienteRepository = new ClienteRepository(connection.getRepository(Cliente))
  const cliente = new ClienteServices(clienteRepository)

  const deleted:boolean = await cliente.delete(idCliente, idEmpresaExist)
  expect(deleted).toBe(true)
})

it('should Delete Clientes not found', async() => {
  const clienteRepository:IClienteRepository = new ClienteRepository(connection.getRepository(Cliente))
  const cliente = new ClienteServices(clienteRepository)
  let errorStrnig = ""
  try{
    await cliente.delete(uuidv4(), idEmpresaExist)
  } catch(err){
    errorStrnig = err.message
  } 
  expect(errorStrnig).toBe('Cliente not found.')
})
