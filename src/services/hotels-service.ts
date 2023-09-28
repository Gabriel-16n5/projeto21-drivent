import { hotelsRepository } from "../repositories/hotels-repository";

async function getHotels(){
    const result = await hotelsRepository.getHotels();
    return result;
}

export const hotelsService = {
    getHotels
}