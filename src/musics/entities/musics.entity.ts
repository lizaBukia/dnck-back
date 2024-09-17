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
import { Album } from '../../albums/entities/album.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Statistic } from '../../statistics/entity/statistic.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.musics, { cascade: true })
  playlists: Playlist[];

  @OneToMany(() => Statistic, (statistic) => statistic.musics)
  statistics: Statistic;

  @Column()
  albumId!: number;

  @ManyToOne(() => Album, (album) => album.musics)
  @JoinColumn({ name: 'albumId' })
  album!: Album;

  @Column()
  src!: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
