import { paymentRepository } from "../repositories/payments-repository";
import { notFoundError, conflictError } from "../errors";

async function getPayment() {
    const result = await paymentRepository.getPayment();
    return result
}

export const paymentService = {
    getPayment
}