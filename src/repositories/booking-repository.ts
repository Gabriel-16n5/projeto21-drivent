import { prisma } from "../config";


async function getUserBooking(userId:number){
    return prisma.booking.findFirst({
        where:{
            userId
        }
    });
}

async function createUserBooking(userId:number, roomId:number){
    return prisma.booking.create({
        data:{
            userId,
            roomId
        }
    })
}

async function editBooking(userId:number, roomId:number, bookingId:number){

    // const bookingId = await prisma.booking.findFirst({
    //     where:{
    //         userId
    //     }
    // })

    return prisma.booking.update({
        where:{
            id: bookingId
        },
        data:{
            roomId
        }
    })
}

export const bookingRepository = {
    getUserBooking,
    createUserBooking,
    editBooking
}