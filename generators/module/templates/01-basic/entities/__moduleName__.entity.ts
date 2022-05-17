import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class <%= kebabToPascal(config.name) %>Entity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The id of the <%= kebabToPascal(config.name) %>' })
  id: number;

  @Column({ length: 500 })
  @ApiProperty({ description: 'The name of the <%= kebabToPascal(config.name) %>' })
  name: string;
}
