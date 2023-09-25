import { prisma } from '@/config';
import { conflictError, notFoundError } from '../errors';

async function getPayment(ticketId:number){
    const result = await prisma.payment.findUnique({
        where: {ticketId}
    })
    return result;
}

export const paymentRepository = {
    getPayment
}