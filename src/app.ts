import express, { type Express } from 'express'
import cors from 'cors'
import { connectDb, disconnectDB } from './config'

const app = express()
app.use(cors())
app.use(express.json())

export async function init(): Promise<Express> {
  connectDb()
  return await Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB()
}

export default app
