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
})
