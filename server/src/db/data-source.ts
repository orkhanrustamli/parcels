// import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Parcel } from '../parcels/parcel.entity';

let dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  migrationsRun: true,
  entities: [Parcel],
  migrations: ['dist/db/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
};

if (process.env.NODE_ENV === 'test') {
  dataSourceOptions = {
    type: 'sqlite',
    database: 'test.db.sqlite',
    entities: [Parcel],
    synchronize: true,
  };
}

export { dataSourceOptions };
export default new DataSource(dataSourceOptions);
