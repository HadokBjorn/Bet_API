import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { ParticipantsService } from 'src/services/participants.service'
import { type ParticipantDTO } from 'src/utils'

async function create(req: Request, res: Response) {
  const { name, balance } = req.body as ParticipantDTO
  const participant = await ParticipantsService.create({ name, balance })
  res.status(httpStatus.CREATED).send(participant)
}

export const ParticipantsController = {
  create,
}
