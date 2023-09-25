import { paymentRepository } from "../repositories/payments-repository";
import { notFoundError, conflictError } from "../errors";
import { TicketId } from "../protocols";

async function getPayment(ticketId:number) {
    const result = await paymentRepository.getPayment(ticketId);
    return result
}

export const paymentService = {
    getPayment
}