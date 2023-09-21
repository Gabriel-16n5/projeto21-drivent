import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTickets } from '../controllers/ticket-controller';

const ticketRouter = Router();

ticketRouter
.all('/*', authenticateToken)
.get('/', getTickets);

export {ticketRouter}