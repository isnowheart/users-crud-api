import { Module } from "@nestjs/common";
import Provider from "./Provider";
import { UsersController } from "./UsersController";

@Module({
  controllers: [UsersController],
  providers: [Provider]
})
export class UsersModule {

}