import { ticketRepository } from "../repositories/ticket-repository";
import { enrollmentRepository } from "../repositories";
import { notFoundError } from "../errors";

async function getTicket(userId: any){
    const user = await enrollmentRepository.findWithAddressByUserId(userId)
    if(user === null) throw notFoundError();
    const result = await ticketRepository.getTicket(userId);
    return result
}

export const ticketService = {
    getTicket
}