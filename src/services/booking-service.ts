import { bookingRepository } from "../repositories/booking-repository";


async function getUserBooking(userId:number) {
    const result = bookingRepository.getUserBooking(userId)
    return result;
}

export const bookingService = {
    getUserBooking
}