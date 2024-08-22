import { RoleEnum } from 'src/auth/enum/user.role';
import { Data } from 'src/data/entity/data.entity';
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

  @OneToMany(() => Data, (data) => data.user)
  data: Data;

  @OneToMany(() => Statistic, (statistic) => statistic.users)
  statistics: Statistic;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
