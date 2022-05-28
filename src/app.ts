import express from 'express'
import { router } from './routes'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(cors('*'))
app.use(express.json())
app.use(router)

export { app }