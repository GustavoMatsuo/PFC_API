import { NextFunction, Request, Response } from "express"
import { verify, JwtPayload, TokenExpiredError } from "jsonwebtoken"

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers

  if(!authorization) {
    return response.status(401).json({msg: 'Token not provided'})
  }

  const token = authorization.replace("Bearer ", "")

  try {
    const decoded = verify(token, "secret")

    const { id, empresa } = decoded as JwtPayload
    request.userId = id
    request.empresaId = empresa

    next()
  } catch (error) {
    const { message } = error as TokenExpiredError

    return message === 'jwt expired'?
      response.status(401).json({msg: 'Token expired'})
      :
      response.status(401).json({msg: 'Token invalid'})
  }
}