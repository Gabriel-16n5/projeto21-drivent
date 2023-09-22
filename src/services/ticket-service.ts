import { ticketRepository } from "../repositories/ticket-repository";
import { enrollmentRepository } from "../repositories";
import { notFoundError } from "../errors";

async function getTicket(userId: any){
    if(!userId) throw notFoundError();
    const user = await enrollmentRepository.findWithAddressByUserId(userId)
    if(user === null) throw notFoundError();
    const result = await ticketRepository.getTicket(userId);
    console.log(result)
    if(result.id === null) throw notFoundError();
    return result
}

async function getTicketTypes(){
    const tt = await ticketRepository.getTicketTypes();
    return tt;
}

export const ticketService = {
    getTicket,
    getTicketTypes
}