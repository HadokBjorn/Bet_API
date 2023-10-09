import { describe, expect, it, jest } from '@jest/globals'
import { type Game } from '@prisma/client'
import { GamesRepository } from '../../src/repositories'
import { GamesService } from '../../src/services'
describe('Game Service test suit', () => {
  it('should return a created game', async () => {
    const gameMock = {
      homeTeamName: 'Flamengo',
      awayTeamName: 'Fluminense',
    }
    let response

    jest
      .spyOn(GamesRepository, 'create')
      .mockImplementationOnce(async (participant: Omit<Game, 'id'>) => {
        response = {
          ...participant,
          id: 1,
        }
        return response
      })

    const participant = await GamesService.create(gameMock)
    expect(participant).toEqual(response)
  })

  it('should return a array with games', async () => {
    const game: Game = {
      id: 1,
      awayTeamName: 'Fluminense',
      awayTeamScore: 0,
      homeTeamName: 'Flamengo',
      homeTeamScore: 0,
      isFinished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    jest.spyOn(GamesRepository, 'findAll').mockImplementationOnce(async () => {
      return [{ ...game }]
    })

    const response = await GamesService.findAll()
    expect(response).toEqual([{ ...game }])
  })

  it('should return a empty array when not exist participants yet', async () => {
    jest.spyOn(GamesRepository, 'findAll').mockImplementationOnce(async () => {
      return []
    })

    const response = await GamesService.findAll()
    expect(response).toEqual([])
  })
})
