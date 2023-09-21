import { ticketRepository } from "../repositories/ticket-repository";

async function getTicket(userId: any){
    const result = await ticketRepository.getTicket(userId);
    return result
}

export const ticketService = {
    getTicket
}