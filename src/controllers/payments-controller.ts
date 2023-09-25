import { Request, Response } from "express";
import { paymentService } from "../services/payments-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from '@/middlewares';
import { paymentRepository } from "../repositories/payments-repository";
import { badRequestError, notFoundError, requestError } from "../errors";
import { TicketId } from "../protocols";

export async function getPayment(req: AuthenticatedRequest,  res: Response){
    const ticketId:number = parseInt(req.query.ticketId as string)
    if(!ticketId) throw badRequestError()
    const payment = await paymentRepository.getPayment(ticketId);
    if(payment === null ) throw notFoundError()
    return res.status(httpStatus.OK).send(payment)
}