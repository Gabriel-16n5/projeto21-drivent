import { conflictError, notFoundError } from '../errors';
import { prisma } from '@/config';

async function getPayment(ticketId: number) {
  const result = await prisma.payment.findUnique({
    where: { ticketId },
  });
  return result;
}

export const paymentRepository = {
  getPayment,
};
