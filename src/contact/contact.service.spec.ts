import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { PrismaService } from '../prisma.service';
import { CreateContactInput } from './dto/create-contact.input';
import { Contact } from './entities/contact.entity';

const contactForCreate: CreateContactInput = {
  name: "Aquila Owens Winters",
  email: "consequat.purus@nibhDonecest.co.uk",
  phone: "561-3053",
  address: "P.O. Box 417, 932 Suspendisse St.",
  avatar: "Rigel Jones",
};

const contact: Contact = {
  id: 1,
  ...contactForCreate,
};

const result = { data: [contact], count: 1};

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService, PrismaService],
    }).compile();

    service = module.get<ContactService>(ContactService);
  });

  it('should get the contacts', async () => {
    jest.spyOn(service, 'find').mockResolvedValue(result);
    expect(await service.find()).toEqual(result);
  });

  it('should create a contact', async () => {
    const serviceSpy = jest.spyOn(service, 'create').mockResolvedValue(contact);
    expect(await service.create(contactForCreate)).toBe(contact);
    expect(serviceSpy).toHaveBeenCalledWith(contactForCreate);
  });

  it('should update a contact', async () => {
    const serviceSpy = jest.spyOn(service, 'update').mockResolvedValue(contact);
    expect(await service.update(contact)).toBe(contact);
    expect(serviceSpy).toHaveBeenCalledWith(contact);
  });

  it('should delete a contact', async () => {
    const serviceSpy = jest.spyOn(service, 'remove').mockResolvedValue(contact);
    expect(await service.remove(contact.id)).toBe(contact);
    expect(serviceSpy).toHaveBeenCalledWith(contact.id);
  });
});
