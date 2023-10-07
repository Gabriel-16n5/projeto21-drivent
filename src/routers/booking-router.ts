import { Router } from "express";
import { getUserBooking } from "../controllers/booking-controller";
import { authenticateToken } from "../middlewares";


const bookingRouter = Router();

bookingRouter
.all('/*', authenticateToken)
.get('/', getUserBooking)

export {bookingRouter}