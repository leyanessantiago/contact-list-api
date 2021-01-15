import { Test, TestingModule } from '@nestjs/testing';
import { ContactResolver } from './contact.resolver';
import { ContactService } from './contact.service';
import { PrismaService } from '../prisma.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';

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

describe('ContactResolver', () => {
  let service: ContactService;
  let resolver: ContactResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactResolver, ContactService, PrismaService],
    }).compile();

    service = await module.get<ContactService>(ContactService);
    resolver = await module.get<ContactResolver>(ContactResolver);
  });

  it('should return an object with an array of all contacts an the count', async () => {
    jest.spyOn(service, 'find').mockResolvedValue(result);
    expect(await resolver.contacts()).toEqual(result);
  });

  it('should return an object with an array of contacts filtered an the count', async () => {
    const serviceSpy = jest.spyOn(service, 'find').mockResolvedValue(result);
    expect(await resolver.contacts(10, 1, ['a'])).toEqual(result);
    expect(serviceSpy).toHaveBeenCalledWith(10, 1, ['a']);
  });

  it('should create a contact', async () => {
    const serviceSpy = jest.spyOn(service, 'create').mockResolvedValue(contact);
    expect(await resolver.createContact(contactForCreate)).toEqual(contact);
    expect(serviceSpy).toHaveBeenCalledWith(contactForCreate);
  });

  it('should update a contact', async () => {
    const serviceSpy = jest.spyOn(service, 'update').mockResolvedValue(contact);
    expect(await resolver.updateContact(contact)).toEqual(contact);
    expect(serviceSpy).toHaveBeenCalledWith(contact);
  });

  it('should delete a contact', async () => {
    const serviceSpy = jest.spyOn(service, 'remove').mockResolvedValue(contact);
    expect(await resolver.removeContact(contact.id)).toEqual(contact);
    expect(serviceSpy).toHaveBeenCalledWith(contact.id);
  });
});
