import { ApiAbstractService } from '@library/api/core/abstract';
import { BookDto } from '@library/common/resource/book';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDocument, BookEntity } from './book.entity';
import { BookMapper } from './book.mapper';

@Injectable()
export class BookService extends ApiAbstractService<BookEntity, BookDto> {

  constructor(
    mapper: BookMapper,
    @InjectModel(BookEntity.name) model: Model<BookDocument>
  ) {
    super(mapper, model)
  }
}
