import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

config();
const PORT = parseInt(process.env.PORT, 10) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocument = fs.readFileSync('./doc/api.yaml', 'utf8');
  const document = yaml.load(swaggerDocument) as OpenAPIObject;
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
