var dbConfig = {};

switch (process.env.NODE_ENV) {
  case 'development':
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      database: 'db.sqlite',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: false,
      migrationsRun: true,
      migrations: ['migrations/*.js'],
      cli: {
        migrationsDir: 'migrations',
      },
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      synchronize: true,
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
