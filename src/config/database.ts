import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
  console.log(`banco conectado!`);
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
  console.log(`Não foi possível conectar ao banco`);
}
