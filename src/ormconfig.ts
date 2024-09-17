import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config({ path: '.env' });
export const connectionSource: DataSource = new DataSource({
  name: 'default',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  type: 'mysql',
  logging: true,
  entities: ['./src/**/*entity.ts'],
  migrations: ['./src/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: true,
});
