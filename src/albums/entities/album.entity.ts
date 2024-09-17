import { Music } from 'src/musics/entities/musics.entity';
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

  @OneToMany(() => Music, (music) => music.album, { eager: true })
  musics!: Music[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deleted!: Date;
}
