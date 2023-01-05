import { NestFactory } from '@nestjs/core';
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

  await app.listen(PORT);
}
bootstrap();
