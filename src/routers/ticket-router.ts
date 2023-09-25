import { Router } from 'express';
import { createTicket, getTicketTypes, getTickets } from '../controllers/ticket-controller';
import { authenticateToken, validateBody } from '@/middlewares';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken).get('/', getTickets).get('/types', getTicketTypes).post('/', createTicket);

export { ticketRouter };
