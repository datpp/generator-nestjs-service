import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type <%= kebabToPascal(config.name) %>Document = <%= kebabToPascal(config.name) %> & Document;

@Schema()
export class <%= kebabToPascal(config.name) %> {
  @Prop()
  name: string;
}

export const <%= kebabToPascal(config.name) %>Schema = SchemaFactory.createForClass(<%= kebabToPascal(config.name) %>);
