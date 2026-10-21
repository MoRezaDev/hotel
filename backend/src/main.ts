import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { CatchEverything } from './catch-all.exception.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('[BOOT] Before NestFactory.create');
  const app = await NestFactory.create(AppModule);
  console.log('[BOOT] After NestFactory.create');
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverything(httpAdapterHost));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
