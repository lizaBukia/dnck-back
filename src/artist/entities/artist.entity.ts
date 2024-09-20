import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { History } from 'src/history/entity/history.entity';

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
  @JoinTable({ name: 'artists_albums' })
  albums: Album[];

  @ManyToOne(() => History)
  history:History

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
