import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketTypes, getTickets } from '../controllers/ticket-controller';

const ticketRouter = Router();

ticketRouter
.all('/*', authenticateToken)
.get('/', getTickets)
.get('/types', getTicketTypes);

export {ticketRouter}