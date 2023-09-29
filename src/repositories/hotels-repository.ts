import { prisma } from '@/config';

async function getHotels(){
    const result = prisma.hotel.findMany();
    return result;
}

async function getRooms(hotelIdInt:number){
    const result = prisma.room.findMany({
        where:{
            hotelId: hotelIdInt
        }
    });
    return result;
}

export const hotelsRepository = {
    getHotels,
    getRooms
}