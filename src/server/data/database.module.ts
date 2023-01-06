import { Module } from '@nestjs/common';
import { Repositories, databaseProviders } from './database.provider';

@Module({
  providers: [...databaseProviders, ...Repositories],
  exports: [...databaseProviders, ...Repositories],
})
export class DatabaseModule {}
