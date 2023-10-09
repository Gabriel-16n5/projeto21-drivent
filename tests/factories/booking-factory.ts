import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createBooking(userId: number, roomId: number) {
  const booking = await prisma.booking.create({
    data: {
      userId,
      roomId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    },
  });
  return booking
}

export async function createRoomWithoutCap(hotelId: number) {
  const room0 = await prisma.room.create({
    data: {
      name: faker.datatype.string(4),
      capacity: 0,
      hotelId
    },
  });
  return room0
}