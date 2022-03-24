import { ApiAbstractMapper } from '@library/api/core/abstract';
import { AuthorCreateDto, AuthorDto, AuthorResetDto, AuthorUpdateDto } from '@library/common/resource/author';
import { Injectable } from '@nestjs/common';
import { AuthorEntity, AuthorEntityWithId } from './author.entity';

@Injectable()
export class AuthorMapper extends ApiAbstractMapper<AuthorEntity, AuthorDto> {
  mapEntityToDto(document: AuthorEntityWithId): AuthorDto {
    return {
      id: document.id,
      firstName: document.firstName,
      lastName: document.lastName
    };
  }

  mapCreateDtoToEntity(dto: AuthorCreateDto): AuthorEntity {
    return {
      firstName: dto.firstName,
      lastName: dto.lastName
    };
  }

  mapUpdateDtoToEntity(dto: AuthorUpdateDto): AuthorEntityWithId {
    return {
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName
    };
  }

  mapResetDtoToEntity(dto: AuthorResetDto): AuthorEntityWithId {
    return {
      id: dto.id,
      firstName: dto.firstName ?? null,
      lastName: dto.lastName ?? null
    };
  }

}
