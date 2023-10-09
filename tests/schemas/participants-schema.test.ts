import { ParticipantSchema } from '../../src/schemas'
import { it, describe } from '@jest/globals'

describe('Participants Schema Test Suits', () => {
  it('Should it is okay when body is correct', () => {
    const participant = {
      name: 'Jhon Doe',
      balance: 1000,
    }
    const { error } = ParticipantSchema.validate(participant, {
      abortEarly: false,
    })

    expect(error).toBeUndefined()
  })

  it('Should return a UnprocessableEntity Error when name is missed', () => {
    const participant = {
      balance: 1000,
    }
    const { error } = ParticipantSchema.validate(participant, {
      abortEarly: false,
    })

    expect(error).toBeDefined()
    expect(error?.details[0].message).toBe('"name" is required')
  })

  it('Should return a UnprocessableEntity Error when balance is missed', () => {
    const participant = {
      name: 'Jhon Doe',
    }
    const { error } = ParticipantSchema.validate(participant, {
      abortEarly: false,
    })

    expect(error).toBeDefined()
    expect(error?.details[0].message).toBe('"balance" is required')
  })

  it('Should return a UnprocessableEntity Error when name have length less than 3', () => {
    const participant = {
      name: 'Ze',
      balance: 1000,
    }
    const { error } = ParticipantSchema.validate(participant, {
      abortEarly: false,
    })

    expect(error).toBeDefined()
    expect(error?.details[0].message).toBe(
      '"name" length must be at least 3 characters long',
    )
  })

  it('Should return a UnprocessableEntity Error when balance is less than 1000', () => {
    const participant = {
      name: 'Jhon Doe',
      balance: 50,
    }
    const { error } = ParticipantSchema.validate(participant, {
      abortEarly: false,
    })

    expect(error).toBeDefined()
    expect(error?.details[0].message).toBe(
      '"balance" must be greater than or equal to 1000',
    )
  })

  it('Should return a UnprocessableEntity Error when body is missed', () => {
    const participant = {}
    const { error } = ParticipantSchema.validate(participant, {
      abortEarly: false,
    })

    expect(error).toBeDefined()
    expect(error?.details[0].message).toBe('"name" is required')
    expect(error?.details[1].message).toBe('"balance" is required')
  })

  it('Should return a UnprocessableEntity Error when body have extra attributes', () => {
    const participant = {
      name: 'Jhon Doe',
      balance: 2000,
      age: 25,
      nameFather: 'Rubens',
      isAdmin: true,
    }
    const validate = ParticipantSchema.validate(participant, {
      abortEarly: false,
    })

    expect(validate.error).toBeDefined()
  })
})
