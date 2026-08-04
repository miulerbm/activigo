import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.WEB_URL ?? true });
  app.useGlobalPipes(new ZodValidationPipe());
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
}

bootstrap();
