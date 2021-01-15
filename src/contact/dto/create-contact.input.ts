import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field()
  avatar: string;
}
