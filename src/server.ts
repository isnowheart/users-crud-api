import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { createConnection } from "typeorm";
import { AppModule } from "./app.module";
import { name, description, version } from "../package.json"

async function bootstrap() {
  await createConnection()
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder().setTitle(name).setDescription(description).setVersion(version).build()
  const customOptions: SwaggerCustomOptions = { customSiteTitle: 'Users CRUD Documentation' }
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('documentation', app, document, customOptions)
  await app.listen(3000)
}

bootstrap()