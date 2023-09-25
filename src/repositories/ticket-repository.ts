import { conflictError, notFoundError } from '../errors';
import { prisma } from '@/config';

async function getTicket(userId: number) {
  const enrollmentData = await prisma.enrollment.findUnique({
    where: {
      userId,
    },
  });
  console.log(enrollmentData);
  if (!enrollmentData) throw notFoundError();
  const ticketData = await prisma.ticket.findUnique({
    where: {
      enrollmentId: enrollmentData.id,
    },
  });
  if (ticketData === null) throw notFoundError();
  const ticketTypeData = await prisma.ticketType.findUnique({
    where: {
      id: ticketData.ticketTypeId,
    },
  });
  if (!ticketTypeData) throw notFoundError();

  const result = {
    id: ticketData.id,
    status: ticketData.status,
    ticketTypeId: ticketData.ticketTypeId,
    enrollmentId: ticketData.enrollmentId,
    TicketType: ticketTypeData,
    createdAt: ticketData.createdAt,
    updatedAt: ticketData.updatedAt,
  };

  return result;
}

async function getTicketTypes() {
  const result = await prisma.ticketType.findMany();
  return result;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollmentData = await prisma.enrollment.findUnique({
    where: {
      userId,
    },
  });
  if (!enrollmentData) throw notFoundError();

  const ticketTypeData = await prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId,
    },
  });
  if (!ticketTypeData) throw notFoundError();

  const createTicket = await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId: enrollmentData.id,
      status: 'RESERVED',
    },
  });
  if (!createTicket) throw notFoundError();
  // const result = {
  //     id: ticketData.id,
  //     status: ticketData.status,
  //     ticketTypeId: ticketData.ticketTypeId,
  //     enrollmentId: ticketData.enrollmentId,
  //     TicketType: ticketTypeData,
  //     createdAt: ticketData.createdAt,
  //     updatedAt: ticketData.updatedAt,
  //   }

  const result = await getTicket(userId);

  return result;
}

export const ticketRepository = {
  getTicket,
  getTicketTypes,
  createTicket,
};
