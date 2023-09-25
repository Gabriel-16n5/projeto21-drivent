import { Request, Response } from "express";
import { paymentService } from "../services/payments-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from '@/middlewares';
import { paymentRepository } from "../repositories/payments-repository";
import { badRequestError, notFoundError, requestError } from "../errors";

export async function getPayment(req: AuthenticatedRequest,  res: Response){
    const payment = await paymentRepository.getPayment();
    return res.status(httpStatus.OK).send(payment)
}