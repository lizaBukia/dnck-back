import { Album } from 'src/albums/entities/album.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Statistic } from '../../statistics/entity/statistic.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  albumId!: number;

  @ManyToMany(() => Playlist, (playlist) => playlist.musics, { cascade: true })
  playlists: Playlist[];

  @OneToMany(() => Statistic, (statistic) => statistic.musics)
  statistics: Statistic;

  @ManyToOne(() => Album, (album) => album.musics)
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
