import { RoleEnum } from 'src/auth/enum/user.role';
import { Statistic } from 'src/statistics/entity/statistic.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { History } from '../../history/entity/history.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: RoleEnum.User })
  role: RoleEnum;

  @OneToMany(() => History, (history) => history.user)
  history: History;

  @OneToMany(() => Statistic, (statistic) => statistic.users)
  statistics: Statistic;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
