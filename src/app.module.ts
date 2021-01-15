import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from "path";
import { ContactModule } from './contact/contact.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ContactModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
