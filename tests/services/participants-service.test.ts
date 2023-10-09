import { describe, expect, it, jest } from '@jest/globals'
import { type Participant } from '@prisma/client'
import { ParticipantsRepository } from '../../src/repositories'
import { ParticipantsService } from '../../src/services/participants.service'
describe('Participant Service test suit', () => {
  it('should return a created participant', async () => {
    const participantMock = {
      name: 'Jhon',
      balance: 2000,
    }
    let response
    jest
      .spyOn(ParticipantsRepository, 'findByName')
      .mockImplementationOnce(async () => {
        return null
      })
    jest
      .spyOn(ParticipantsRepository, 'create')
      .mockImplementationOnce(async (participant: Omit<Participant, 'id'>) => {
        response = {
          ...participant,
          id: 1,
        }
        return response
      })

    const participant = await ParticipantsService.create(participantMock)
    expect(participant).toEqual(response)
  })

  it('should return a ConflictError when name already exist', async () => {
    const participantMock = {
      name: 'Jhon',
      balance: 2000,
    }
    jest
      .spyOn(ParticipantsRepository, 'findByName')
      .mockImplementationOnce(async () => {
        return {
          ...participantMock,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: 1,
        }
      })

    await ParticipantsService.create(participantMock).catch((error) => {
      expect(error).toEqual({
        name: 'ConflictError',
        message: `${participantMock.name} already exists!`,
      })
    })
  })

  it('should return a array with participants', async () => {
    const participant = {
      id: 1,
      name: 'Jhon',
      balance: 2000,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    jest
      .spyOn(ParticipantsRepository, 'findAll')
      .mockImplementationOnce(async () => {
        return [{ ...participant }]
      })

    const response = await ParticipantsService.findAll()
    expect(response).toEqual([{ ...participant }])
  })

  it('should return a empty array when not exist participants yet', async () => {
    jest
      .spyOn(ParticipantsRepository, 'findAll')
      .mockImplementationOnce(async () => {
        return []
      })

    const response = await ParticipantsService.findAll()
    expect(response).toEqual([])
  })
})
