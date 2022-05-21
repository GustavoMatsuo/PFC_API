import express from 'express'
import { router } from './routes'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
dotenv.config()

app.use(cors('*'))
app.use(express.json())
app.use(router)

export { app }