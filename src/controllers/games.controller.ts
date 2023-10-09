import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { GamesService } from '../services'
import { type GameDTO } from 'src/utils'

async function create(req: Request, res: Response) {
  const { awayTeamName, homeTeamName } = req.body as GameDTO
  const game = await GamesService.create({ awayTeamName, homeTeamName })
  res.status(httpStatus.CREATED).send(game)
}
async function findAll(req: Request, res: Response) {
  const games = await GamesService.findAll()
  res.status(httpStatus.OK).send(games)
}

export const GamesController = {
  create,
  findAll,
}
