import { Router } from 'express'
import { GameSchema, GameUpdateSchema } from '../schemas'
import { GamesController } from '../controllers'
import { validateSchema } from '../middlewares'

export const GameRouter = Router()

GameRouter.post('/', validateSchema(GameSchema), GamesController.create)
  .get('/', GamesController.findAll)
  .get('/:id', GamesController.findOne)
  .post('/:id/finish', validateSchema(GameUpdateSchema), GamesController.update)
