import { ApiAbstractService } from '@library/api/core/abstract';
import { AuthorDto } from '@library/common/resource/author';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorDocument, AuthorEntity } from './author.entity';
import { AuthorMapper } from './author.mapper';

@Injectable()
export class AuthorService extends ApiAbstractService<AuthorEntity, AuthorDto> {
  constructor(
    mapper: AuthorMapper,
    @InjectModel(AuthorEntity.name) model: Model<AuthorDocument>
  ) {
    super(mapper, model);
  }
}
