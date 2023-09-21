import { ticketRepository } from "../repositories/ticket-repository";

async function getTicket(){
    const result = await ticketRepository.getTicket();
    return result
}

export const ticketService = {
    getTicket
}