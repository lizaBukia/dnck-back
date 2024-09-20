import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnum } from '../../auth/enum/user.role';
import { History } from '../../history/entity/history.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Statistic } from '../../statistics/entity/statistic.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: RoleEnum.User })
  role: RoleEnum;

  @OneToMany(() => History, (history) => history.user)
  history: History;

  @OneToMany(() => Statistic, (statistic) => statistic.users)
  statistics: Statistic;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
