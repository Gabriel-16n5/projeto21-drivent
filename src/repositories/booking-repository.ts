import { prisma } from "../config";


async function getUserBooking(userId:number){
    return prisma.booking.findMany();
}

async function createUserBooking(userId:number, roomId:number){
    return prisma.booking.create({
        data:{
            userId,
            roomId
        }
    })
}

export const bookingRepository = {
    getUserBooking,
    createUserBooking
}