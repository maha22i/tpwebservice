import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiExceptionFilter, ErrorFilter, NotFoundExceptionFilter } from './api-exception.filter';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { mongoDbUri } from './database.util';

@Module({
  imports: [MongooseModule.forRoot(mongoDbUri), BookModule, AuthorModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter
    }
  ],
})
export class AppModule {}
