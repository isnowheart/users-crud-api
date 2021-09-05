import { NestFactory } from "@nestjs/core";
import { createConnection } from "typeorm";
import { AppModule } from "./app.module";

async function bootstrap() {
  await createConnection()
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}

bootstrap()