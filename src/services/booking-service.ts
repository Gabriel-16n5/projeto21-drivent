import { bookingRepository } from "../repositories/booking-repository";


async function getUserBooking(userId:number) {
    const result = bookingRepository.getUserBooking(userId)
    return result;
}

async function createUserBooking(userId:number, roomId:number) {
    const result = bookingRepository.createUserBooking(userId, roomId);
    return result;
}

export const bookingService = {
    getUserBooking,
    createUserBooking
}