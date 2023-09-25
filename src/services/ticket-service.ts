import { ticketRepository } from '../repositories/ticket-repository';
import { enrollmentRepository } from '../repositories';
import { notFoundError, conflictError } from '../errors';

async function getTicket(userId: number) {
  if (!userId) throw notFoundError();
  const user = await enrollmentRepository.findWithAddressByUserId(userId);
  if (user === null) throw notFoundError();
  const result = await ticketRepository.getTicket(userId);
  if (result.id === null) throw notFoundError();
  return result;
}

async function getTicketTypes() {
  const tt = await ticketRepository.getTicketTypes();
  return tt;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const result = await ticketRepository.createTicket(userId, ticketTypeId);
  return result;
}

export const ticketService = {
  getTicket,
  getTicketTypes,
  createTicket,
};
