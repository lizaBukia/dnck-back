import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('album')
export class AlbumEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    imgUrl!: string;
}