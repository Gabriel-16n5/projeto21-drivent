import { notFoundError } from "../errors";
import { forbiddenError } from "../errors/forbidden-error";
import { bookingRepository } from "../repositories/booking-repository";


async function getUserBooking(userId:number) {
    const result = await bookingRepository.getUserBooking(userId)
    if(result === "usuário não tem reserva")throw notFoundError()
    return result;
}

async function createUserBooking(userId:number, roomId:number) {
    const result = await bookingRepository.createUserBooking(userId, roomId);
    if(result === "quarto não existe") throw notFoundError()
    if(result === "sem vaga") throw forbiddenError(result)
    if(!result) throw forbiddenError("erro inesperado");
    return result;
}

async function editBooking(userId:number, roomId:number, bookingId:number){
    const result = await bookingRepository.editBooking(userId, roomId, bookingId)
    if(result !== "sem vaga" && result !== "usuário não possui reserva" && result !== "quarto não existe") throw forbiddenError("usuário não tem ingresso do tipo presencial, com hospedagem e ingresso pago")
    if(result === "usuário não possui reserva") throw forbiddenError(result)
    if(result === "quarto não existe") throw notFoundError()
    if(result === "sem vaga") throw forbiddenError(result)
    return result
}

export const bookingService = {
    getUserBooking,
    createUserBooking,
    editBooking
}