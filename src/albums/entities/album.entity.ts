import { History } from 'src/history/entity/history.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
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

  @ManyToOne(() => History)
  history: History;

  @Column()
  releaseDate!: string;

  @Column()
  artistId: number;

  @ManyToMany(() => ArtistEntity, (artistEntity) => artistEntity.albums)
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
