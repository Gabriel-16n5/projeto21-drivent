import { prisma } from "../config";


async function getUserBooking(userId:number){
    const booking = await prisma.booking.findFirst({
        where:{
            userId
        }
    });
    if(!booking) return "usuário não tem reserva"
    const Room = await prisma.room.findUnique({
        where: {
            id: booking.roomId
        }
    })
    const result = {
        id: booking.id,
        Room
    }
    return result
}

async function createUserBooking(userId:number, roomId:number){
    const getRoomId = await prisma.room.findUnique({
        where: {
            id: roomId
        }
    })
    if(!getRoomId) return "quarto não existe"
    const booking = await prisma.booking.findMany({
        where: {
            roomId
        }
    })
    if(getRoomId.capacity < booking.length) return "sem vaga"
    const getEnrollmentId = await prisma.enrollment.findUnique({
        where: {
            userId
        }
    })
    if(!getEnrollmentId) return "usuário sem inscrição"
    const getTicketId = await prisma.ticket.findUnique({
        where: {
            enrollmentId: getEnrollmentId.id
        }
    })
    if(!getTicketId) return "usuário sem ingresso"
    const getTicketType = await prisma.ticketType.findUnique({
        where: {
            id: getTicketId.ticketTypeId
        }
    })
    if(getTicketId.status !== "PAID" || getTicketType.includesHotel !== true || getTicketType.isRemote !== false){
        return "usuário não tem ingresso do tipo presencial, com hospedagem e ingresso pago"
    }
    if(!getTicketId) return "usuário não presencial ou com hotel incluso"



    const created = await prisma.booking.create({
        data:{
            userId,
            roomId
        }
    })

    const result = {
        bookingId: created.id
    }
    return result
}

async function editBooking(userId:number, roomId:number, bookingId:number){

    const Getbooking = await prisma.booking.findUnique({
        where:{
            userId
        }
    })
    if(!Getbooking) return "usuário não possui reserva"

    const getRoomId = await prisma.room.findUnique({
        where: {
            id: roomId
        }
    })
    if(!getRoomId) return "quarto não existe"
    const booking = await prisma.booking.findMany({
        where: {
            roomId
        }
    })
    if(booking.length >= getRoomId.capacity) return "sem vaga"

    const edited = await prisma.booking.update({
        where:{
            id: bookingId
        },
        data:{
            roomId
        }
    })
    const result = {
        bookingId: edited.id
    }
    return result
}

export const bookingRepository = {
    getUserBooking,
    createUserBooking,
    editBooking
}