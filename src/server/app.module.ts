import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { join, resolve } from 'path';
import { PagesController } from './controllers/pages';

import { Group } from './data/models/group.entity';
import { Project } from './data/models/project.entity';

const IS_DEV = process.env.NODE_ENV === 'development';

const REPOSITORY_MODELS = [Project, Group];

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: IS_DEV,
        dir: resolve(__dirname, '..', '..'),
        conf: {
          useFileSystemPublicRoutes: true,
        },
      }),
      {
        viewsDir: null,
        passthrough404: true,
        dev: IS_DEV,
      },
    ),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: 'root',
      password: 'root',
      database: 'mission-control',
      authSource: 'admin',
      entities: REPOSITORY_MODELS,
      synchronize: IS_DEV,
    }),
    TypeOrmModule.forFeature(REPOSITORY_MODELS),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
  ],
  controllers: [PagesController],
  providers: [],
})
export class AppModule {}
