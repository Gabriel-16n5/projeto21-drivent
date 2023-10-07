import { Router } from "express";
import { createUserBooking, editBooking, getUserBooking } from "../controllers/booking-controller";
import { authenticateToken } from "../middlewares";


const bookingRouter = Router();

bookingRouter
.all('/*', authenticateToken)
.get('/', getUserBooking)
.post('/', createUserBooking)
.put('/:bookingId', editBooking)

export {bookingRouter}