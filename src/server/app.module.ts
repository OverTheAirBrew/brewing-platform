import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { join, resolve } from 'path';
import { DeviceController } from './controllers/devices';
import { PagesController } from './controllers/pages';
import databaseConfig from './data/database.config';
import { DeviceService } from './lib/device.service';

const IS_DEV = process.env.NODE_ENV === 'development';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
  ],
  controllers: [PagesController, DeviceController],
  providers: [DeviceService],
})
export class AppModule {}
