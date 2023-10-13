import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { GamesService } from '../services'
import { type GameUpdateDTO, type GameDTO } from 'src/utils'

async function create(req: Request, res: Response) {
  const { awayTeamName, homeTeamName } = req.body as GameDTO
  const game = await GamesService.create({ awayTeamName, homeTeamName })
  res.status(httpStatus.CREATED).send(game)
}
async function findAll(req: Request, res: Response) {
  const games = await GamesService.findAll()
  res.status(httpStatus.OK).send(games)
}

async function findOne(req: Request, res: Response) {
  const id = Number(req.params.id)
  const game = await GamesService.findOne(id)
  res.status(httpStatus.OK).send(game)
}

async function update(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { awayTeamScore, homeTeamScore } = req.body as GameUpdateDTO
  const updateGame = await GamesService.update(id, {
    awayTeamScore,
    homeTeamScore,
  })
  res.status(httpStatus.OK).send(updateGame)
}

export const GamesController = {
  create,
  findAll,
  findOne,
  update,
}
