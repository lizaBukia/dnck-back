import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config as AWS_CONFIG } from 'aws-sdk';
import { AppModule } from './app.module';
async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  AWS_CONFIG.update({
    accessKeyId: process.env.DNCK__BACK_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.DNCK_BACK_S3_SECRET_ACCESS_KEY,
  });
  await app.listen(3000);
}
bootstrap();
