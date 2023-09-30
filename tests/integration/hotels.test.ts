import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { createHotel2, createTicket2, createTicketType2 } from '../factories/hotels-factory';
import { createEnrollmentWithAddress, createTicket, createTicketType, createUser, createhAddressWithCEP } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /hotels', () => {
    it('GET all hotels with auth without enrollment, validated ticket paid included hotel', async () => {
      const token = await generateValidToken();
      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('GET all hotels without auth', async () => {
        const response = await server.get('/hotels').set('Authorization', `Bearer sapo`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });

      it('GET all hotels with auth with enrollment, validated ticket paid included hotel', async () => {
        const user = await createUser();
        const enrollment = await createEnrollmentWithAddress(user);
        const token = await generateValidToken(user);
        const ticketType = await createTicketType2();
        const ticket = await createTicket2(enrollment.id, ticketType.id)
        await createHotel2();await createHotel2();await createHotel2();await createHotel2();await createHotel2();await createHotel2()
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.OK);
      });

      it('GET all hotels with auth without enrollment', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        await createHotel2();await createHotel2();await createHotel2();await createHotel2();await createHotel2();await createHotel2()
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });

      it('GET all hotels with auth with enrollment, invalidated ticket no paid or hotel not included', async () => {
        const user = await createUser();
        const enrollment = await createEnrollmentWithAddress(user);
        const token = await generateValidToken(user);
        const ticketType = await createTicketType()
        const ticket = await createTicket(enrollment.id,ticketType.id, "RESERVED")
        await createHotel2();await createHotel2();await createHotel2();await createHotel2();await createHotel2();await createHotel2()        
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
      });

    // it('should respond with status 400 when body is not valid', async () => {
    //   const token = await generateValidToken();
    //   const body = { [faker.lorem.word()]: faker.lorem.word() };

    //   const response = await server.post('/enrollments').set('Authorization', `Bearer ${token}`).send(body);

    //   expect(response.status).toBe(httpStatus.BAD_REQUEST);
    // })
})
