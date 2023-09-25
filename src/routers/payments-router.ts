import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { getPayment } from '../controllers/payments-controller';

const paymentRouter = Router();

paymentRouter.all('/*', authenticateToken).get('/ticketId?', getPayment);

export { paymentRouter };
