import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateContactInput } from './dto/update-contact.input';
import { CreateContactInput } from './dto/create-contact.input';
import { FindManyContactArgs, Prisma } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private prismaService: PrismaService) {}

  async create(createContactInput: CreateContactInput) {
    return await this.prismaService.contact.create({
      data: {
        name: createContactInput.name,
        email: createContactInput.email,
        phone: createContactInput.phone,
        address: createContactInput.address,
        avatar: createContactInput.avatar,
      },
    });
  }

  async find(limit?: number, page?: number, searchStrings?: string[]) {
    const args: FindManyContactArgs = {
      take: limit,
      skip: page ? limit * (page - 1) : 0,
    }

    if (searchStrings && searchStrings.length > 0) {
      args.where = {
        OR: [
          { name: { in: searchStrings, mode: 'insensitive'} },
          { email: { in: searchStrings, mode: 'insensitive'} },
          { address: { in: searchStrings, mode: 'insensitive'} },
          { phone: { in: searchStrings, mode: 'insensitive'} },
        ],
      }
    }

    const count = await this.prismaService.contact.count({where: args.where});

    const response = await this.prismaService.contact.findMany(args);

    return {
      data: response,
      count,
    }
  }

  async findOne(id: number) {
    return await this.prismaService.contact.findUnique({
      where: { id },
    })
  }

  async update(updateContactInput: UpdateContactInput) {
    return await this.prismaService.contact.update({
      where: { id: updateContactInput.id },
      data: {
        name: updateContactInput.name,
        email: updateContactInput.email,
        phone: updateContactInput.phone,
        address: updateContactInput.address,
        avatar: updateContactInput.avatar,
      },
    })
  }

  async remove(id: number) {
    return await this.prismaService.contact.delete({
      where: { id }
    })
  }
}
