import { prisma } from '../src/config'

export async function cleanDB() {
  await prisma.participant.deleteMany()
}
