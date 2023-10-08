import { prisma } from "../config";


async function getUserBooking(userId:number){
    return prisma.booking.findFirst({
        where:{
            userId
        }
    });
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
    if(!getTicketId) return "usuário não presencial ou com hotel incluso"

    if(getTicketId.status !== "PAID" || getTicketType.includesHotel !== true || getTicketType.isRemote !== false){
        return "usuário não tem ingresso do tipo presencial, com hospedagem e ingresso pago"
    }

    const created = prisma.booking.create({
        data:{
            userId,
            roomId
        }
    })
    return "reserva feita"
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