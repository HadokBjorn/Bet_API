import app, { init } from '../../src/app'
import supertest from 'supertest'
import { cleanDB } from '../helpers'
import { beforeEach, describe, it } from '@jest/globals'
import httpStatus from 'http-status'
import { prisma } from '../../src/config'

beforeAll(async () => {
  await init()
})

beforeEach(async () => {
  await cleanDB()
})
const server = supertest(app)

describe('POST => /participants', () => {
  it('should respond with status 422 when body is not given', async () => {
    const response = await server.post('/participants')

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
  })

  it('should respond with status 422 when body is not valid', async () => {
    const invalidBody = { name: 'ze', balance: 55 }

    const response = await server.post('/participants').send(invalidBody)

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
  })

  it('should respond with status 422 when name is not valid', async () => {
    const invalidBody = { name: 'ze', balance: 2000 }

    const response = await server.post('/participants').send(invalidBody)

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
    expect(response.body[0]).toBe(
      '"name" length must be at least 3 characters long',
    )
  })

  it('should respond with status 201 and create a participant', async () => {
    const participant = { name: 'Jhon Doe', balance: 2000 }
    const response = await server.post('/participants').send(participant)
    const isCreated = await prisma.participant.findMany()

    expect(response.status).toBe(httpStatus.CREATED)
    expect(isCreated).toHaveLength(1)
  })

  it('should respond with status 409 and not create a participant', async () => {
    const participant = { name: 'Jhon Doe', balance: 2000 }
    await prisma.participant.create({
      data: participant,
    })
    const response = await server.post('/participants').send(participant)
    const isCreated = await prisma.participant.findMany()

    expect(response.status).toBe(httpStatus.CONFLICT)
    expect(isCreated).toHaveLength(1)
  })
})

describe('GET => /participants', () => {
  it('Should return a empty array', async () => {
    const response = await server.get('/participants')
    const participant = await prisma.participant.findMany()
    expect(response.status).toBe(httpStatus.OK)
    expect(response.body).toHaveLength(0)
    expect(participant).toHaveLength(0)
  })

  it('Should return a array with all participants', async () => {
    await prisma.participant.createMany({
      data: [
        {
          name: 'Joe Doe',
          balance: 3000,
          createdAt: new Date(),
        },
        {
          name: 'Mike Hills',
          balance: 5000,
          createdAt: new Date(),
        },
      ],
    })
    const response = await server.get('/participants')
    const participant = await prisma.participant.findMany()
    expect(response.status).toBe(httpStatus.OK)
    expect(response.body).toHaveLength(2)
    expect(participant).toHaveLength(2)
  })
})
