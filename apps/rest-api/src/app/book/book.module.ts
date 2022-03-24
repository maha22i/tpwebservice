import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookEntity, BookSchema } from './book.entity';
import { BookMapper } from './book.mapper';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: BookEntity.name,
      schema: BookSchema
    }
  ])],
  controllers: [BookController],
  providers: [
    BookService,
    BookMapper
  ],
})
export class BookModule {}
