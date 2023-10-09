import { Router } from 'express'
import { ParticipantSchema } from '../schemas'
import { ParticipantsController } from '../controllers'
import { validateSchema } from '../middlewares'

export const ParticipantRouter = Router()

ParticipantRouter.post(
  '/',
  validateSchema(ParticipantSchema),
  ParticipantsController.create,
).get('/', ParticipantsController.findAll)
