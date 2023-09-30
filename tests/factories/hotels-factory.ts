import faker from '@faker-js/faker';
import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import { User } from '@prisma/client';

import { createUser } from './users-factory';
import { prisma } from '@/config';

export async function createTicket2(enrollmentId:number, ticketTypeId:number) {
  
    return prisma.ticket.create({
        data:{
            ticketTypeId,
            enrollmentId,
            status: "PAID",
        }
    });
  }

export async function createTicketType2() {
  
    return prisma.ticketType.create({
        data:{
            name: "sapo",
            price: 12,
            isRemote: false,
            includesHotel: true,
        }
    });
  }

  export async function createHotel2() {
  
    return prisma.hotel.create({
        data:{
            name: faker.name.firstName(),
            image: faker.internet.url(),
        }
    });
  }

  export async function createRoom2(hotelId:number) {
  
    return prisma.room.create({
        data:{
            name: faker.name.firstName(),
            capacity: faker.datatype.number(),
            hotelId
        }
    });
  }

  export async function createBookingRoom2(userId:number, roomId:number) {
  
    return prisma.booking.create({
        data:{
            userId,
            roomId,
        }
    });
  }