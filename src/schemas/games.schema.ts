import joi from 'joi'
import { type GameUpdateDTO, type GameDTO } from '../utils'

export const GameSchema = joi.object<GameDTO>({
  homeTeamName: joi.string().min(3).trim().required(),
  awayTeamName: joi.string().min(3).trim().required(),
})

export const GameUpdateSchema = joi.object<GameUpdateDTO>({
  homeTeamScore: joi.number().integer().min(0).required(),
  awayTeamScore: joi.number().integer().min(0).required(),
})
