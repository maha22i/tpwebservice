import { CreateValidationDtoFactory, ResetValidationDtoFactory, UpdateValidationDtoFactory } from '@library/api/validation/core';
import { IsObjectId } from '@library/api/validation/id';
import { BookCreateDto, BookDto, BookResetDto, BookUpdateDto } from '@library/common/resource/book';
import { IsDateString, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class BookValidationDto implements BookDto {
  @IsObjectId() id: string;
  @IsString() title: string;
  @IsOptional() @IsString() @MinLength(10) summary: string;
  @IsDateString() publicationDate: string;
  @IsInt() @Min(0) likeCount: number;
}

export class BookCreateValidationDto extends CreateValidationDtoFactory(BookValidationDto) implements BookCreateDto {}
export class BookUpdateValidationDto extends UpdateValidationDtoFactory(BookValidationDto) implements BookUpdateDto {}
export class BookResetValidationDto extends ResetValidationDtoFactory(BookValidationDto) implements BookResetDto {}
