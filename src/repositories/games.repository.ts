import { type Game } from '@prisma/client'
import { prisma } from '../config'

async function create(game: Omit<Game, 'id'>) {
  return await prisma.game.create({
    data: game,
  })
}

async function findAll() {
  return await prisma.game.findMany()
}

export const GamesRepository = {
  create,
  findAll,
}
