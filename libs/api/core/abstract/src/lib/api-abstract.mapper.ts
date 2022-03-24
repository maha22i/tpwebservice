import { EntityWithId } from '@library/api/repository/core';
import { CreateDto, Dto, ResetDto, UpdateDto } from '@library/common/resource/core';

export abstract class ApiAbstractMapper<
  TEntity,
  TDto extends Dto,
  TCreateDto = CreateDto<TDto>,
  TUpdateDto = UpdateDto<TDto>,
  TResetDto = ResetDto<TDto>
  > {

  abstract mapEntityToDto(entity: EntityWithId<TEntity>): TDto;
  abstract mapCreateDtoToEntity(dto: TCreateDto): TEntity;
  abstract mapUpdateDtoToEntity(dto: TUpdateDto): EntityWithId<TEntity>;
  abstract mapResetDtoToEntity(dto: TResetDto): EntityWithId<TEntity>;

  mapEntitiesToDtos(documents: EntityWithId<TEntity>[]): TDto[] {
    return documents?.map(document => this.mapEntityToDto(document));
  }
}
