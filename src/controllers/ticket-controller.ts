import { Request, Response } from "express";
import { ticketService } from "../services/ticket-service";
import httpStatus from "http-status";


export async function getTicket(req: Request,  res: Response){
    const ticket = await ticketService.getTicket();

    return res.status(httpStatus.OK).send(ticket);
}