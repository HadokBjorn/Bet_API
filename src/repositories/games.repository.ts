import { type Game } from '@prisma/client'
import { prisma } from '../config'
import { type GameUpdateDTO } from '../utils'

async function create(game: Omit<Game, 'id'>) {
  return await prisma.game.create({
    data: game,
  })
}

async function findAll() {
  return await prisma.game.findMany()
}

async function findOne(id: number) {
  return await prisma.game.findUnique({
    where: { id },
  })
}

async function update(id: number, gameUpdate: GameUpdateDTO) {
  return await prisma.game.update({
    where: { id },
    data: { ...gameUpdate, isFinished: true },
  })
}

export const GamesRepository = {
  create,
  findAll,
  findOne,
  update,
}
