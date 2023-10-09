import { type Game } from '@prisma/client'
import { type GameDTO } from '../utils'
import { GamesRepository } from '../repositories'
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

export const GamesService = {
  create,
  findAll,
}
