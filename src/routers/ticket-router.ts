import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicket } from '../controllers/ticket-controller';

const ticketRouter = Router();

ticketRouter
.get('/', getTicket);

export {ticketRouter}