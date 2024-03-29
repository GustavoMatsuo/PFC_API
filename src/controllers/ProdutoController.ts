import { Response, Request } from "express"
import { IProdutoServices } from '@interfaces'
import { CreateProdutoDTO, UpdateProdutoDTO } from "@dto/ProdutoDTO"

export class ProdutoController {
  private produtoServices:IProdutoServices

  constructor(produtoServices:IProdutoServices) {
    this.produtoServices = produtoServices
  }

  async index(request:Request, response:Response):Promise<Response> {
    try {
      const { limit, skip, name, order, tags } = request.query
      const formattedLimit = limit? Number(limit) : null
      const formattedSkip = skip?  Number(skip) : null
      const formattedName = name?  String(name) : null
      const formattedOrder = order?  String(order) : null
      const formattedTags = tags?  String(tags).split(";") : null

      const produtoList = await this.produtoServices.index(
        request.empresaId, 
        formattedLimit, 
        formattedSkip,
        formattedName,
        formattedOrder,
        formattedTags
      )
  
      return response.status(200).json(produtoList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async create(request:Request, response:Response):Promise<Response> {
    try {
      const { nome, codigo, fornecedor, valor_unitario, estoque_minimo, categoria, desconto } = request.body
      const produto:CreateProdutoDTO = { 
        nome, 
        codigo,
        fornecedor, 
        valor_unitario, 
        desconto,
        estoque_minimo, 
        categoria,
        empresa: request.empresaId
      }

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
      const { 
        id_produto,
        nome, 
        status, 
        codigo, 
        fornecedor, 
        valor_unitario,
        desconto,
        estoque_minimo, 
        categoria 
      } = request.body

      const produto:UpdateProdutoDTO = { 
        id_produto, 
        nome, 
        status, 
        codigo, 
        fornecedor,
        valor_unitario,
        desconto,
        estoque_minimo,
        categoria,
        empresa: request.empresaId
      }

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

      await this.produtoServices.changeStatus(id, request.empresaId)
  
      return response.status(200).json({msg: "produto status update."})
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }

  async simpleList(request:Request, response:Response):Promise<Response> {
    try {
      const produtoList = await this.produtoServices.simpleList(request.empresaId)
  
      return response.status(200).json(produtoList)
    } catch (err) {
      return response.status(400).json({
        msg: err.message || 'Unexpected error.'
      })
    }
  }
}