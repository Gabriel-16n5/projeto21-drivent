import { hotelsRepository } from "../repositories/hotels-repository";

async function getHotels(){
    const result = await hotelsRepository.getHotels();
    return result;
}

async function getRooms(hotelIdInt:number){
    const result = await hotelsRepository.getRooms(hotelIdInt);
    return result;
}

export const hotelsService = {
    getHotels,
    getRooms
}