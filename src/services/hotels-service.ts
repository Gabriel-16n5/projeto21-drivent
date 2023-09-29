import { hotelsRepository } from "../repositories/hotels-repository";

async function getHotels(userId:number){
    const result = await hotelsRepository.getHotels(userId);
    return result;
}

async function getRooms(hotelIdInt:number, userId:number){
    const result = await hotelsRepository.getRooms(hotelIdInt, userId);
    return result;
}

export const hotelsService = {
    getHotels,
    getRooms
}