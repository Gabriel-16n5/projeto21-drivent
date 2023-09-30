import { prisma } from '@/config';
import { notFoundError } from '../errors';
import { PaymentRequiredError } from '../errors/payment-required-error';

async function getHotels(userId:number){
    const checkEnrollment = await getEnrollment(userId);
    if(!checkEnrollment) throw notFoundError();
    const checkPaidticket = await getTicket(checkEnrollment.id);
    if(!checkPaidticket) throw notFoundError();
    if(checkPaidticket.status !== "PAID") throw PaymentRequiredError();
    const checkTicketType = await getTicketType(checkPaidticket.ticketTypeId);
    if(checkTicketType.includesHotel === false) throw PaymentRequiredError();
    if(checkTicketType.isRemote === true) throw PaymentRequiredError();
    const result = await prisma.hotel.findMany();
    if(result.length === 0) throw notFoundError();
    return result;
}

async function getRooms(hotelIdInt:number, userId:number){
    const validat = await getHotels(userId);
    const hotel = await prisma.hotel.findUnique({
        where:{
            id: hotelIdInt
        }
    })
    const rooms = await prisma.room.findMany({
        where:{
            hotelId: hotelIdInt
        }
    });
    if(rooms.length === 0) throw notFoundError();
    const result = {
        id: hotel.id,
        name: hotel.name,
        image: hotel.image,
        createAt: hotel.createdAt,
        updateAt: hotel.updatedAt,
        rooms
    }
    return result;
}

async function getEnrollment(userId:number){
    const result = prisma.enrollment.findUnique({
        where: {
            userId
        }
    });
    return result;
}

async function getTicket(enrollmentId:number){
    const result = prisma.ticket.findUnique({
        where: {
            enrollmentId
        }
    });
    return result;
}

async function getTicketType(ticketTypeId:number){
    const result = prisma.ticketType.findUnique({
        where: {
            id: ticketTypeId
        }
    });
    return result;
}

async function getBooking(userId:number){
    const result = prisma.booking.findFirst({
        where: {
            userId
        }
    });
    return result;
}

async function getRoom(roomId:number){
    const result = prisma.room.findFirst({
        where: {
            id: roomId
        }
    });
    return result;
}

export const hotelsRepository = {
    getHotels,
    getRooms
}