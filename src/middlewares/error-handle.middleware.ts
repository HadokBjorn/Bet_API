import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type Error } from 'src/utils'

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(error)

  if (error.name === 'ConflictError') {
    return res.status(httpStatus.CONFLICT).send(error.message)
  }

  if (error.name === 'NotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send(error.message)
  }
  if (error.name === 'UnauthorizedError') {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message)
  }
  if (error.name === 'UnprocessableEntityError') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message)
  }

  return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send('Sorry, something went wrong 😢')
}
