import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: '' })
  imgUrl!: string;

  @Column()
  releaseDate!: string;

  @ManyToMany(() => ArtistEntity, (artistEntity) => artistEntity.albums)
  @JoinTable({ name: 'artist_albums' })
  artists!: ArtistEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
