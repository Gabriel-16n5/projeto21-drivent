import { Request, Response } from "express";
import { ticketService } from "../services/ticket-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from '@/middlewares';
import { ticketRepository } from "../repositories/ticket-repository";
import { badRequestError, notFoundError, requestError } from "../errors";

export async function getTickets(req: AuthenticatedRequest,  res: Response){
    const { userId } = req;
    const ticket = await ticketService.getTicket(userId);

    return res.status(httpStatus.OK).send(ticket);
}

export async function getTicketTypes(req: AuthenticatedRequest,  res: Response){
    const tt = await ticketRepository.getTicketTypes();

    res.status(httpStatus.OK).send(tt)
}

export async function createTicket(req: AuthenticatedRequest, res: Response){
    const {ticketTypeId} = req.body;
    const { userId } = req;
    if(!ticketTypeId) throw badRequestError();
    const result = await ticketRepository.createTicket(userId, ticketTypeId)
    res.status(httpStatus.CREATED).send(result)
}