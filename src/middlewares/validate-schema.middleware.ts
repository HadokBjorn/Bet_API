import { type NextFunction, type Request, type Response } from 'express'
import { type Schema } from 'joi'
import { UnprocessableEntityError } from 'src/errors'

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false })

    if (validation.error !== undefined) {
      const errors = validation.error.details.map((detail) => detail.message)
      throw UnprocessableEntityError(errors)
    }

    next()
  }
}
