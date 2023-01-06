import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RenderService } from 'nest-next';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const service = app.get(RenderService);
  service.setErrorHandler(async (err, req, res) => {
    console.log(err);
    res.send(err.response);
  });

  const config = new DocumentBuilder()
    .setTitle('OverTheAir Brewing Platform')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT);
}
bootstrap();
