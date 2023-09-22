import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, getTicketTypes, getTickets } from '../controllers/ticket-controller';

const ticketRouter = Router();

ticketRouter
.all('/*', authenticateToken)
.get('/', getTickets)
.get('/types', getTicketTypes)
.post('/', createTicket)

export {ticketRouter}