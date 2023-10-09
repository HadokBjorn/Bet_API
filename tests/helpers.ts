import { prisma } from '../src/config'

export async function cleanDB() {
  await prisma.game.deleteMany()
  await prisma.participant.deleteMany()
}
