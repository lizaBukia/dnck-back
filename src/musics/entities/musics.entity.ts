import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imgUrl: string;
}
