import { CreateDocumentationDtoFactory, ResetDocumentationDtoFactory, UpdateDocumentationDtoFactory } from '@library/api/documentation/core';
import { BookCreateDto, BookDto, BookResetDto, BookUpdateDto } from '@library/common/resource/book';
import { ApiProperty } from '@nestjs/swagger';

export const bookExample: BookDto = {
  id: '6214c0f2857cfb3569c19166',
  title: `Le Seigneur des Anneaux 1 - La Fraternité de l'Anneau`,
  summary: `C'est un dangereux héritage que Bilbo Bessac cède à son neveu avant de disparaître : l'anneau de pouvoir forgé par Sauron et dérobé jadis à Gollum. Le mage noir n'aspire qu'à retrouver son arme et sa puissance, et déjà ses cavaliers font route vers le Comté... Pour leur échapper et détruire la menace que représente cet anneau, le jeune hobbit, Frodo, et ses compagnons commencent la périlleuse traversée de la Terre du Milieu, dans l'espoir d'atteindre la Faille du Destin, au cœur du Mordor.`,
  publicationDate: new Date('2018-02-14').toISOString(),
  likeCount: 1000
}

export class ApiBookDto implements BookDto {
  @ApiProperty({ example: bookExample.id }) id: string;
  @ApiProperty({ example: bookExample.title }) title: string;
  @ApiProperty({ example: bookExample.summary, required: false, minLength: 10 }) summary: string;
  @ApiProperty({ example: bookExample.publicationDate, format: 'date-time' }) publicationDate: string;
  @ApiProperty({ example: bookExample.likeCount, type: 'integer', minimum: 0 }) likeCount: number;
}

export class ApiBookCreateDto extends CreateDocumentationDtoFactory(ApiBookDto) implements BookCreateDto {}
export class ApiBookUpdateDto extends UpdateDocumentationDtoFactory(ApiBookDto) implements BookUpdateDto {}
export class ApiBookResetDto extends ResetDocumentationDtoFactory(ApiBookDto) implements BookResetDto {}
