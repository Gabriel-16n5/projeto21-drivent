import { prisma } from '@/config';

async function getTicket(userId:any){
    const result = await prisma.enrollment.findUnique({
        where: {
            userId
        }
    });
    return result
}

async function getTicketTypes(){
    const result = await prisma.ticketType.findMany();
    return result
}

export const ticketRepository = {
    getTicket,
    getTicketTypes
}