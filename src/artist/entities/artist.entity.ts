import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Album } from '../../albums/entities/album.entity';

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

  @ManyToMany(() => Album, (album) => album.artists, { eager: true })
  albums: Album[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
