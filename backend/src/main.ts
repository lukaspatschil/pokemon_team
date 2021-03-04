import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

const logger = new Logger('MainApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
