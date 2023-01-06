import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { homedir } from 'os';
import { join } from 'path';
import { ModelCtor, Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';
import { DEVICE_REPOSITORY } from './database.abstractions';
import { IDBConfiguration } from './database.config';
import { Device } from './entities/device.entity';

const DatabaseModels: ModelCtor[] = [Device];
const HOME_DIR = homedir();

export const Repositories: Provider[] = [
  {
    provide: DEVICE_REPOSITORY,
    useValue: Device,
  },
];

async function createSequelizeInstance(config: IDBConfiguration) {
  if (config.mysql?.host) {
    return new Sequelize({
      dialect: 'mysql',
      host: config.mysql.host,
      port: config.mysql.port,
      username: config.mysql.username,
      password: config.mysql.password,
      database: config.mysql.database,
      models: DatabaseModels,
      define: {
        timestamps: true,
      },
    });
  }

  return new Sequelize({
    dialect: 'sqlite',
    storage: join(HOME_DIR, config.local.database_name),
    models: DatabaseModels,
    define: {
      timestamps: true,
    },
  });
}

export const databaseProviders: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const databaseConfig = configService.get<IDBConfiguration>('DATABASE');

      const sequelizeInstance = await createSequelizeInstance(databaseConfig);

      if (process.env.CI !== 'true') {
        await migrateDatabase(sequelizeInstance);
      }

      return sequelizeInstance;
    },
    inject: [ConfigService],
  },
];

export async function migrateDatabase(sequelize: Sequelize) {
  const umzug = new Umzug({
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
    }),
    migrations: {
      glob: '**/migrations/*.js',
    },
    logger: console,
  });

  await umzug.up();
}
