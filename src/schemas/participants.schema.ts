import joi from 'joi'
import { type ParticipantDTO } from '../utils'

export const ParticipantSchema = joi.object<ParticipantDTO>({
  name: joi.string().min(3).trim().required(),
  balance: joi.number().integer().min(1000).required(),
})
