import { prisma } from "../config";


async function getUserBooking(userId:number){
    prisma.booking.findMany();
}

export const bookingRepository = {
    getUserBooking
}