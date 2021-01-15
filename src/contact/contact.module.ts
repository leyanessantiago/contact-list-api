import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, ContactResolver, ContactService]
})
export class ContactModule {}
