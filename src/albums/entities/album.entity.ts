import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { Music } from '../../musics/entities/musics.entity';

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

  @OneToMany(() => Music, (music) => music.album)
  musics: Music[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
