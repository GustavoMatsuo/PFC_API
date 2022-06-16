import { Response, Request } from "express"
import { IProdutoServices } from '@interfaces'
import { ICreateProdutoDTO, IUpdateProdutoDTO } from "@dto/ProdutoDTO"

export class ProdutoController {
  private produtoServices:IProdutoServices

  constructor(produtoServices:IProdutoServices) {
    this.produtoServices = produtoServices
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const { limit, skip } = request.params
      const produtoList = await this.produtoServices.index(limit, skip)
  
      return response.status(200).json(produtoList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { nome, fornecedor, valor_unitario, estoque_minimo, categoria } = request.body
      const produto:ICreateProdutoDTO = { nome, fornecedor, valor_unitario, estoque_minimo, categoria }

      await this.produtoServices.create(produto)
  
      return response.status(201).json({msg: "produto created"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async update(request:Request, response:Response):Promise<Response> {
    try {
      const { id_produto, nome, status, fornecedor, valor_unitario, estoque_minimo, categoria } = request.body
      const produto:IUpdateProdutoDTO = { id_produto, nome, status, fornecedor, valor_unitario, estoque_minimo, categoria }

      await this.produtoServices.update(produto)
  
      return response.status(200).json({msg: "produto updated"})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async changeStatus(request:Request, response:Response):Promise<Response> {
    try {
      const { id } = request.body

      await this.produtoServices.changeStatus(id)
  
      return response.status(200).json({msg: "produto status update."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}