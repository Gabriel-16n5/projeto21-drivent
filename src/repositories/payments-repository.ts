import { prisma } from '@/config';
import { conflictError, notFoundError } from '../errors';

async function getPayment(){
    const result = await prisma.payment.findMany();
    return result;
}

export const paymentRepository = {
    getPayment
}