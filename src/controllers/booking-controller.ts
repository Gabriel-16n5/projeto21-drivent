import { Response } from 'express';
import { AuthenticatedRequest } from "../middlewares";
import { bookingService } from "../services/booking-service";
import httpStatus from "http-status";


export async function getUserBooking(req: AuthenticatedRequest, res: Response ) {
    const {userId} = req;

    const booking = await bookingService.getUserBooking(userId);
    res.status(httpStatus.OK).send(booking)
}