import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from './author.controller';
import { AuthorEntity, AuthorSchema } from './author.entity';
import { AuthorMapper } from './author.mapper';
import { AuthorService } from './author.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: AuthorEntity.name,
      schema: AuthorSchema
    }
  ])],
  controllers: [AuthorController],
  providers: [
    AuthorService,
    AuthorMapper
  ],
})
export class AuthorModule {}
