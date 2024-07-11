import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  @Entity()
  export class ArtistEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    biography: string;
    @CreateDateColumn()
    createdAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
  }