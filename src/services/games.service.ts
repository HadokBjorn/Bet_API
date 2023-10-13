import { type Game } from '@prisma/client'
import { type GameDTO, type GameUpdateDTO } from '../utils'
import { GamesRepository } from '../repositories'
import { UnprocessableEntityError, notFoundError } from '../errors'
async function create(gameDto: GameDTO) {
  const newGame: Omit<Game, 'id'> = {
    ...gameDto,
    createdAt: new Date(),
    updatedAt: new Date(),
    awayTeamScore: 0,
    homeTeamScore: 0,
    isFinished: false,
  }
  return await GamesRepository.create(newGame)
}

async function findAll() {
  return await GamesRepository.findAll()
}

async function findOne(id: number) {
  if (isNaN(id)) throw UnprocessableEntityError('id must be a integer number')
  const game = await GamesRepository.findOne(id)
  if (game === null) throw notFoundError('game')

  return game
}

async function update(id: number, gameUpdate: GameUpdateDTO) {
  const { isFinished } = await findOne(id)
  if (isFinished) throw UnprocessableEntityError('Game already finished')
  return await GamesRepository.update(id, gameUpdate)
}

export const GamesService = {
  create,
  findAll,
  findOne,
  update,
}
