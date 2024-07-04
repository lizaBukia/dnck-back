import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  biography: string;
}
