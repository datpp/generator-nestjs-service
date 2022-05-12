import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class <%= kebabToPascal(config.name) %>Pipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // do your work here
    return value;
  }
}
