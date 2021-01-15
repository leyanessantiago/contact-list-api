import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { AppModule } from './app.module';

const contacts = require('../prisma/contacts.json');

const prisma = new PrismaClient();

async function bootstrap() {
  try {
    const contact = await prisma.contact.findFirst();
    if (!contact) {
      console.log(contact);
      await Promise.all(
        contacts.map(async contact => {
          return await prisma.contact.create({ data: { ...contact } });
        })
      );
    }
  } catch (e) {
    console.error(e)
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
