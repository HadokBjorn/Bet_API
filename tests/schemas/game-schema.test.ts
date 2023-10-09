import { GameSchema } from '../../src/schemas'
import { it, describe } from '@jest/globals'

describe('Games Schema Test Suits', () => {
  it('Should it is okay when body is correct', () => {
    const game = {
      homeTeamName: 'Flamengo',
      awayTeamName: 'Palmeiras',
    }
    const { error } = GameSchema.validate(game, {
      abortEarly: false,
    })

    expect(error).toBeUndefined()
  })

  it('Should return a UnprocessableEntity Error when homeTeamName is missed', () => {
    const game = {
      awayTeamName: 'Palmeiras',
    }
    const { error } = GameSchema.validate(game, {
      abortEarly: false,
    })

    expect(error).toBeDefined()
    expect(error?.details[0].message).toBe('"homeTeamName" is required')
  })

  it('Should return a UnprocessableEntity Error when awayTeamName is missed', () => {
    const game = {
      homeTeamName: 'Flamengo',
    }
    const { error } = GameSchema.validate(game, {
      abortEarly: false,
    })

    expect(error).toBeDefined()
    expect(error?.details[0].message).toBe('"awayTeamName" is required')
  })

  it('Should return a UnprocessableEntity Error when name have length less than 3', () => {
    const game = {
      homeTeamName: 'SP',
      awayTeamName: 'Palmeiras',
    }
    const { error } = GameSchema.validate(game, {
      abortEarly: false,
    })

    expect(error).toBeDefined()
    expect(error?.details[0].message).toBe(
      '"homeTeamName" length must be at least 3 characters long',
    )
  })

  it('Should return a UnprocessableEntity Error when body is missed', () => {
    const game = {}
    const { error } = GameSchema.validate(game, {
      abortEarly: false,
    })

    expect(error).toBeDefined()
    expect(error?.details[0].message).toBe('"homeTeamName" is required')
    expect(error?.details[1].message).toBe('"awayTeamName" is required')
  })

  it('Should return a UnprocessableEntity Error when body have extra attributes', () => {
    const game = {
      homeTeamName: 'Flamengo',
      awayTeamName: 'Palmeiras',
      age: 25,
      nameFather: 'Rubens',
      isAdmin: true,
    }
    const validate = GameSchema.validate(game, {
      abortEarly: false,
    })

    expect(validate.error).toBeDefined()
  })
})
