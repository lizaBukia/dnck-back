import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ormconfigts1724430760365 implements MigrationInterface {
  name = 'Ormconfig.ts1724430760365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`playlist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`imgUrl\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`music\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`imgUrl\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`statistic\` (\`id\` int NOT NULL AUTO_INCREMENT, \`musicId\` int NOT NULL, \`userId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`location\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`artist_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`biography\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`album\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`imgUrl\` varchar(255) NOT NULL DEFAULT '', \`releaseDate\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`playlist_musics_music\` (\`playlistId\` int NOT NULL, \`musicId\` int NOT NULL, INDEX \`IDX_707cf8980b6979bb1661a68085\` (\`playlistId\`), INDEX \`IDX_8ad05d38667a83b35ad79500a8\` (\`musicId\`), PRIMARY KEY (\`playlistId\`, \`musicId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`artist_albums\` (\`albumId\` int NOT NULL, \`artistEntityId\` int NOT NULL, INDEX \`IDX_8e83c54cd9c53f2abb85213c7d\` (\`albumId\`), INDEX \`IDX_841bc9dbb03f0ee0301a8abb79\` (\`artistEntityId\`), PRIMARY KEY (\`albudmId\`, \`artistEntityId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`statistic\` ADD CONSTRAINT \`FK_750cb8231bd54210f81ea4ac2b4\` FOREIGN KEY (\`musicId\`) REFERENCES \`music\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`statistic\` ADD CONSTRAINT \`FK_840e1d086391a3d4fe89ce719b9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`history\` ADD CONSTRAINT \`FK_7d339708f0fa8446e3c4128dea9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`playlist_musics_music\` ADD CONSTRAINT \`FK_707cf8980b6979bb1661a68085e\` FOREIGN KEY (\`playlistId\`) REFERENCES \`playlist\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`playlist_musics_music\` ADD CONSTRAINT \`FK_8ad05d38667a83b35ad79500a85\` FOREIGN KEY (\`musicId\`) REFERENCES \`music\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`artist_albums\` ADD CONSTRAINT \`FK_8e83c54cd9c53f2abb85213c7d1\` FOREIGN KEY (\`albumId\`) REFERENCES \`album\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`artist_albums\` ADD CONSTRAINT \`FK_841bc9dbb03f0ee0301a8abb79c\` FOREIGN KEY (\`artistEntityId\`) REFERENCES \`artist_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`artist_albums\` DROP FOREIGN KEY \`FK_841bc9dbb03f0ee0301a8abb79c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`artist_albums\` DROP FOREIGN KEY \`FK_8e83c54cd9c53f2abb85213c7d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`playlist_musics_music\` DROP FOREIGN KEY \`FK_8ad05d38667a83b35ad79500a85\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`playlist_musics_music\` DROP FOREIGN KEY \`FK_707cf8980b6979bb1661a68085e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`history\` DROP FOREIGN KEY \`FK_7d339708f0fa8446e3c4128dea9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`statistic\` DROP FOREIGN KEY \`FK_840e1d086391a3d4fe89ce719b9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`statistic\` DROP FOREIGN KEY \`FK_750cb8231bd54210f81ea4ac2b4\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_841bc9dbb03f0ee0301a8abb79\` ON \`artist_albums\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8e83c54cd9c53f2abb85213c7d\` ON \`artist_albums\``,
    );
    await queryRunner.query(`DROP TABLE \`artist_albums\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8ad05d38667a83b35ad79500a8\` ON \`playlist_musics_music\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_707cf8980b6979bb1661a68085\` ON \`playlist_musics_music\``,
    );
    await queryRunner.query(`DROP TABLE \`playlist_musics_music\``);
    await queryRunner.query(`DROP TABLE \`album\``);
    await queryRunner.query(`DROP TABLE \`artist_entity\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`history\``);
    await queryRunner.query(`DROP TABLE \`statistic\``);
    await queryRunner.query(`DROP TABLE \`music\``);
    await queryRunner.query(`DROP TABLE \`playlist\``);
  }
}
