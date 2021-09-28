import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DATABASE_USER || 'js-learn',
  password: process.env.DATABASE_PASSWORD || 'js-learn',
  database: 'taskmanagement',
  entities: ['dist/**/*.entity.{js,ts}'],
  synchronize: true,
};
