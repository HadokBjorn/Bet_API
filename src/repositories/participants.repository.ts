import { type Participant } from '@prisma/client'
import { prisma } from '../config'

async function create(participant: Omit<Participant, 'id'>) {
  return await prisma.participant.create({
    data: participant,
  })
}
async function findByName(name: string) {
  return await prisma.participant.findFirst({
    where: {
      name,
    },
  })
}

async function findAll() {
  return await prisma.participant.findMany()
}

export const ParticipantsRepository = {
  create,
  findByName,
  findAll,
}
