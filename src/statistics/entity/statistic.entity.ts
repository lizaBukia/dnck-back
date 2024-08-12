import { Playlist } from 'src/playlists/entities/playlist.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.musics, { cascade: true })
  playlists: Playlist[];

  @CreateDateColumn()
  date: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
