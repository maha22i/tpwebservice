import { EntityDocument, EntityWithId } from '@library/api/repository/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'books' })
export class BookEntity {
  @Prop({ required: true }) title: string;
  @Prop() description: string;
  @Prop({ required: true, type: Date }) publicationDate: Date;
  @Prop() likeCount: number;
}

export type BookEntityWithId = EntityWithId<BookEntity>;
export type BookDocument = EntityDocument<BookEntity>;
export const BookSchema = SchemaFactory.createForClass(BookEntity);
