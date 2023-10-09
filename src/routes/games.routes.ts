import { Router } from 'express'
import { GameSchema } from '../schemas'
import { GamesController } from '../controllers'
import { validateSchema } from '../middlewares'

export const GameRouter = Router()

GameRouter.post('/', validateSchema(GameSchema), GamesController.create).get(
  '/',
  GamesController.findAll,
)
