import joi from 'joi'
import { type ParticipantDTO } from '../utils'

export const ParticipantSchema = joi.object<ParticipantDTO>({
  name: joi.string().min(3).trim(),
  balance: joi.number().min(1000),
})
