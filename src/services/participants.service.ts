import { type Participant } from '@prisma/client'
import { conflictError } from '../errors'
import { type ParticipantDTO } from '../utils'
import { ParticipantsRepository } from '../repositories'
async function create(participant: ParticipantDTO) {
  const { name, balance } = participant
  const findByName = await ParticipantsRepository.findByName(name)

  if (findByName !== null) throw conflictError(name)

  const newParticipant: Omit<Participant, 'id'> = {
    name,
    balance,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await ParticipantsRepository.create(newParticipant)
}

export const ParticipantsService = {
  create,
}
