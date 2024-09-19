import { Music } from 'src/musics/entities/musics.entity';
import { Playlist } from 'src/playlists/entities/playlist.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.history)
  user: User;

  @Column()
  location: string;

  @OneToMany(() => Playlist, (playlist) => playlist.history)
  playlist: Playlist;

  @OneToMany(() => Music, (music) => music.history)
  musics: Music[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
