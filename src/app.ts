import express, { type Express } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { connectDb, disconnectDB, loadEnv } from './config'
import { GameRouter, ParticipantRouter } from './routes'
import errorHandler from './middlewares/error-handle.middleware'

loadEnv()
const app = express()
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/participants', ParticipantRouter)
  .use('/games', GameRouter)
  .use(errorHandler)

export async function init(): Promise<Express> {
  connectDb()
  return await Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB()
}

export default app
