import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { checkObjectId } from './is-object-id.util';

@Injectable()
export class IsObjectIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    const id = value as string;
    switch (metadata.type) {
      case 'param':
      case 'query':
        return checkObjectId(id);
      default:
        return value;
    }
  }
}
