import { prisma } from '@/config';

async function getHotels(){
    const result = prisma.hotel.findMany();
    return result;
}

export const hotelsRepository = {
    getHotels
}