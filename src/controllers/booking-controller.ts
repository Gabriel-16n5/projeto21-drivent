import { Response } from 'express';
import { AuthenticatedRequest } from "../middlewares";
import { bookingService } from "../services/booking-service";
import httpStatus from "http-status";
import { RoomId } from '../protocols';


export async function getUserBooking(req: AuthenticatedRequest, res: Response ) {
    const {userId} = req;

    const booking = await bookingService.getUserBooking(userId);
    res.status(httpStatus.OK).send(booking)
}

export async function createUserBooking(req: AuthenticatedRequest, res: Response) {
    const {userId} = req;
    const {roomId} = req.body as RoomId

    const booking = await bookingService.createUserBooking(userId, roomId)
    res.status(httpStatus.OK).send(booking)
}