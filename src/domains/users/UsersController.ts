import { Controller, Get } from "@nestjs/common";
import Provider from "./provider";

@Controller('users')
export class UsersController {
  constructor (private userProvider:Provider) {

  } 

  @Get()
  async index() {
    return this.userProvider.test()
  }
}