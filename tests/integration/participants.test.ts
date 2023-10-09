import app, { init } from '../../src/app'
import supertest from 'supertest'
import { cleanDB } from '../helpers'
import { describe, it } from '@jest/globals'
import httpStatus from 'http-status'

beforeAll(async () => {
  await init()
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
})
