import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';
import * as process from 'process';
import { config } from 'dotenv';

config({
  path: `.env.${process.env.NODE_ENV}`,
});

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

const task = (process.argv[2] || '').trim();

switch (task) {
  case 'up':
    umzug.up().then((result) => {
      console.log('Migrations up went successful!', result);
      process.exit(0);
    });
    break;
  case 'down':
    umzug.down().then((result) => {
      console.log('Migrations down went successful!', result);
      process.exit(0);
    });
    break;
  default:
    break;
}
