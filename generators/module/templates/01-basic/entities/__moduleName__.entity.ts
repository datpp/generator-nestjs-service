import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class <%= kebabToPascal(config.name) %>Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;
}
