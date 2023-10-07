import { Router } from "express";
import { createUserBooking, getUserBooking } from "../controllers/booking-controller";
import { authenticateToken } from "../middlewares";


const bookingRouter = Router();

bookingRouter
.all('/*', authenticateToken)
.get('/', getUserBooking)
.post('/', createUserBooking)

export {bookingRouter}