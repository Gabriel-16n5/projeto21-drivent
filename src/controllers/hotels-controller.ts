import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '../services/hotels-service';

type Hotels = {hotelId: string };

export async function getHotels(req: AuthenticatedRequest, res: Response){
    const { userId } = req
    const hotelList = await hotelsService.getHotels(userId);
    res.status(httpStatus.OK).send(hotelList);
}

export async function getRooms(req: AuthenticatedRequest, res: Response){
    const { userId } = req;
    const {hotelId} = req.query as Hotels;
    const hotelIdInt = parseInt(hotelId);
    const hotelList = await hotelsService.getRooms(hotelIdInt, userId);
    res.status(httpStatus.OK).send(hotelList);
}