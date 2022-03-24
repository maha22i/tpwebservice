import { ApiAbstractMapper } from '@library/api/core/abstract';
import { Log } from '@library/api/core/logging';
import { BookCreateDto, BookDto, BookResetDto, BookUpdateDto } from '@library/common/resource/book';
import { Injectable, Logger } from '@nestjs/common';
import { BookEntity, BookEntityWithId } from './book.entity';

export const bookDocumentToDto = (document: BookEntityWithId): BookDto => ({
  id: document.id,
  title: document.title,
  summary: document.description,
  publicationDate: document.publicationDate?.toISOString(),
  likeCount: document.likeCount
});

export const bookCreateDtoToEntity = (dto: BookCreateDto): BookEntity => ({
  title: dto.title,
  description: dto.summary,
  publicationDate: dto.publicationDate && new Date(dto.publicationDate),
  likeCount: dto.likeCount
});

export const bookUpdateDtoToEntity = (dto: BookUpdateDto): BookEntityWithId => ({
  id: dto.id,
  title: dto.title,
  description: dto.summary,
  publicationDate: dto.publicationDate && new Date(dto.publicationDate),
  likeCount: dto.likeCount
});

export const bookResetDtoToEntity = (dto: BookResetDto): BookEntityWithId => ({
  id: dto.id,
  title: dto.title ?? null,
  description: dto.summary ?? null,
  publicationDate: dto.publicationDate ? new Date(dto.publicationDate) : null,
  likeCount: dto.likeCount ?? null
});

@Injectable()
export class BookMapper extends ApiAbstractMapper<BookEntity, BookDto> {

  protected logger = new Logger(BookMapper.name);

  @Log()
  mapEntityToDto(document: BookEntityWithId): BookDto {
    return bookDocumentToDto(document);
  }

  @Log()
  mapCreateDtoToEntity(dto: BookCreateDto): BookEntity {
    return bookCreateDtoToEntity(dto);
  }

  @Log()
  mapUpdateDtoToEntity(dto: BookUpdateDto): BookEntityWithId {
    return bookUpdateDtoToEntity(dto);
  }

  @Log()
  mapResetDtoToEntity(dto: BookUpdateDto): BookEntityWithId {
    return bookResetDtoToEntity(dto);
  }
}
