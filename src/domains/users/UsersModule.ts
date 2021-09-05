import { Module } from "@nestjs/common";
import Provider from "./provider";
import { UsersController } from "./UsersController";

@Module({
  controllers: [UsersController],
  providers: [Provider]
})
export class UsersModule {

}