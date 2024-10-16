import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>('CORS_ORIGIN');
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);

  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,POST',
  });
}
bootstrap();
