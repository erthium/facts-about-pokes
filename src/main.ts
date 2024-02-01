import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS need to allow access to 'https://site-about-pokes.vercel.app/'
  app.enableCors({
    origin: 'https://site-about-pokes.vercel.app',
  });
  await app.listen(3000);
}
bootstrap();
