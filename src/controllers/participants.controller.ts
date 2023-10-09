import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { ParticipantsService } from '../services'
import { type ParticipantDTO } from 'src/utils'

async function create(req: Request, res: Response) {
  const { name, balance } = req.body as ParticipantDTO
  const participant = await ParticipantsService.create({ name, balance })
  res.status(httpStatus.CREATED).send(participant)
}
async function findAll(req: Request, res: Response) {
  const participants = await ParticipantsService.findAll()
  res.status(httpStatus.OK).send(participants)
}

export const ParticipantsController = {
  create,
  findAll,
}
