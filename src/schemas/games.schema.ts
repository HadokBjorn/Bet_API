import joi from 'joi'
import { type GameDTO } from '../utils'

export const GameSchema = joi.object<GameDTO>({
  homeTeamName: joi.string().min(3).trim().required(),
  awayTeamName: joi.string().min(3).trim().required(),
})
