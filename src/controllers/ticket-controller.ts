import { Request, Response } from "express";
import { ticketService } from "../services/ticket-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from '@/middlewares';

export async function getTickets(req: AuthenticatedRequest,  res: Response){
    const { userId } = req;
    const ticket = await ticketService.getTicket(userId);

    return res.status(httpStatus.OK).send(ticket);
}