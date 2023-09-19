import { Response } from 'express';
import httpStatus from 'http-status';
import { invalidDataError } from '../errors';
import { AuthenticatedRequest } from '@/middlewares';
import { enrollmentsService } from '@/services';
import { C } from '../protocols';

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

  return res.status(httpStatus.OK).send(enrollmentWithAddress);
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  const cc = req.body.address.cep;
  const cep = cc.replace(new RegExp('-', 'g'), '');
  const address = await enrollmentsService.getAddressFromCEP(cep);
  if (address.logradouro === undefined) throw invalidDataError('cep');
  await enrollmentsService.createOrUpdateEnrollmentWithAddress({
    ...req.body,
    userId: req.userId,
  });

  return res.sendStatus(httpStatus.OK);
}

export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  const { cep } = req.query as C;
  if (req.query.cep.length !== 8) throw invalidDataError('cep fornecido invalido');
  const address = await enrollmentsService.getAddressFromCEP(cep);
  res.status(httpStatus.OK).send(address);
}
