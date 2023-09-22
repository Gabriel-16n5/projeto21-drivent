import { prisma } from '@/config';

async function getTicket(userId:any){
    const enrollmentData = await prisma.enrollment.findUnique({
        where: {
            userId
        }
    });

    const ticketData = await prisma.ticket.findUnique({
        where: {
            id:enrollmentData.id
        }
    })
    
    const ticketTypeData = await prisma.ticketType.findUnique({
        where:{
            id:ticketData.ticketTypeId
        }
    })

    const result = {
        id: ticketData.id,
        status: ticketData.status,
        ticketTypeId: ticketData.ticketTypeId,
        enrollmentId: ticketData.enrollmentId,
        TicketType: ticketTypeData,
        createdAt: ticketData.createdAt,
        updatedAt: ticketData.updatedAt,
      }

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