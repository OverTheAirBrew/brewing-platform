import { registerAs } from '@nestjs/config';

export interface IDBConfiguration {
  mysql: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  local: {
    database_name: string;
  };
}

export default registerAs<IDBConfiguration>('DATABASE', () => ({
  mysql: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  local: {
    database_name: process.env.SQLLITE_DATABASE_NAME || 'ota.homebrew.db',
  },
}));
