import { Module } from "@nestjs/common";
import { UsersModule } from "./domains/users/UsersModule";

@Module({
  imports: [UsersModule]
})
export class AppModule {

}