import { prisma } from '@/config';

async function getTicket(){
    const result = await prisma.ticket.findMany();
    return result
}

export const ticketRepository = {
    getTicket
}