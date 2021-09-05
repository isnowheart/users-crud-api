import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EditUserBodyParams } from './DTO/EditUserBodyParams'
import { StoreUserBodyParams } from './DTO/StoreUserBodyParams'
import { User } from "../../entities/User";
import { UserRouteParams } from './DTO/UserRouteParams'
import Provider from "./provider";

@Controller('users')
export class UsersController {
  constructor (private userProvider:Provider) {
  } 

  @Get()
  async index():Promise<Array<User>> {
    return this.userProvider.index()
  }

  @Get(':id')
  async show(@Param() params:UserRouteParams):Promise<User> {
    return this.userProvider.show(params.id)
  }

  @Post()
  async store(@Body() body:StoreUserBodyParams):Promise<User> {
    return this.userProvider.store(body)
  }

  @Put(':id')
  async edit(@Param() params:UserRouteParams,@Body() body:EditUserBodyParams):Promise<User> {
    return this.userProvider.edit(params.id, body)
  } 

  @Delete(':id')
  async delete(@Param() params:UserRouteParams):Promise<void> {
    return this.userProvider.delete(params.id) 
  }
}