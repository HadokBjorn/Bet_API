import app, { init } from '../../src/app'
import supertest from 'supertest'
import { cleanDB } from '../helpers'
import { beforeAll, beforeEach, describe, it } from '@jest/globals'
import httpStatus from 'http-status'
import { prisma } from '../../src/config'
import { GamesFactory } from '../factories'

beforeAll(async () => {
  await init()
})

beforeEach(async () => {
  await cleanDB()
})
const server = supertest(app)

describe('POST => /games', () => {
  it('should respond with status 422 when body is not given', async () => {
    const response = await server.post('/games')

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
  })

  it('should respond with status 422 when body is not valid', async () => {
    const invalidBody = { homeTeamName: 'Fl', awayTeamName: '' }

    const response = await server.post('/games').send(invalidBody)

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
  })

  it('should respond with status 422 when homeTeamName is not valid', async () => {
    const invalidBody = { homeTeamName: 'Fl', awayTeamName: 'Flamengo' }

    const response = await server.post('/games').send(invalidBody)

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
    expect(response.body[0]).toBe(
      '"homeTeamName" length must be at least 3 characters long',
    )
  })

  it('should respond with status 422 when awayTeamName is not valid', async () => {
    const invalidBody = { homeTeamName: 'Fluminense', awayTeamName: 'SP' }

    const response = await server.post('/games').send(invalidBody)

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
    expect(response.body[0]).toBe(
      '"awayTeamName" length must be at least 3 characters long',
    )
  })

  it('should respond with status 201 and create a game', async () => {
    const game = { homeTeamName: 'Fluminense', awayTeamName: 'São Paulo' }
    const response = await server.post('/games').send(game)
    const isCreated = await prisma.game.findMany()

    expect(response.status).toBe(httpStatus.CREATED)
    expect(isCreated).toHaveLength(1)
  })
})

describe('GET => /games', () => {
  it('Should return a empty array', async () => {
    const response = await server.get('/games')
    const games = await prisma.game.findMany()
    expect(response.status).toBe(httpStatus.OK)
    expect(response.body).toHaveLength(0)
    expect(games).toHaveLength(0)
  })

  it('Should return a array with all games', async () => {
    await prisma.game.createMany({
      data: [
        {
          awayTeamName: 'Flamengo',
          awayTeamScore: 2,
          homeTeamName: 'Fluminense',
          homeTeamScore: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isFinished: true,
        },
        {
          awayTeamName: 'São Paulo',
          awayTeamScore: 0,
          homeTeamName: 'Fluminense',
          homeTeamScore: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isFinished: false,
        },
      ],
    })
    const response = await server.get('/games')
    const games = await prisma.game.findMany()
    expect(response.status).toBe(httpStatus.OK)
    expect(response.body).toHaveLength(2)
    expect(games).toHaveLength(2)
  })
})

describe('GET => /games/:id', () => {
  it('should return 422 when id is a string', async () => {
    const { status } = await server.get('/games/test')
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
  })

  it('should return 404 when id not exist', async () => {
    // the number in url is static but the database is cleaned before each test
    const { status } = await server.get('/games/1')
    expect(status).toBe(httpStatus.NOT_FOUND)
  })
  it('should return 200 and a game when id exist', async () => {
    const game = await new GamesFactory()
      .setHomeTeamName('Flamengo')
      .setAwayTeamName('Fluminense')
      .createGame()
    const { status, body } = await server.get(`/games/${game.id}`)
    expect(status).toBe(httpStatus.OK)
    // FIXME: When bet crud is implemented, add a attribute bet:[]
    expect(body).toEqual({
      ...game,
      createdAt: game.createdAt.toISOString(),
      updatedAt: game.updatedAt.toISOString(),
    })
  })
})
