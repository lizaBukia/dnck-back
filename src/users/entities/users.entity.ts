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
import { Statistic } from '../../statistics/entity/statistic.entity';
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
