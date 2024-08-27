import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Music } from '../../musics/entities/musics.entity';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  musicId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Music, (music) => music.statistics, { cascade: true })
  @JoinColumn({ name: 'musicId' })
  musics: Music[];

  @ManyToOne(() => User, (user) => user.statistics, { cascade: true })
  @JoinColumn({ name: 'userId' })
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
