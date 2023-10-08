import { notFoundError } from "../errors";
import { bookingRepository } from "../repositories/booking-repository";


async function getUserBooking(userId:number) {
    const result = await bookingRepository.getUserBooking(userId)
    if(!result)throw notFoundError()
    return result;
}

async function createUserBooking(userId:number, roomId:number) {
    const result = await bookingRepository.createUserBooking(userId, roomId);
    return result;
}

async function editBooking(userId:number, roomId:number, bookingId:number){
    const result = await bookingRepository.editBooking(userId, roomId, bookingId)
    return result
}

export const bookingService = {
    getUserBooking,
    createUserBooking,
    editBooking
}