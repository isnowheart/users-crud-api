import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { User } from '../../entities/User'
import { EditUserParams, StoreUserParams } from '../users/DTO/UserParams'

@Injectable()
export default class Provider {
  async index():Promise<Array<User>> {
    const userList = await User.find()
    return userList
  }

  async show(id:number):Promise<User> {
    try {
      const getUser = await User.findOneOrFail(id)
      return getUser
    } catch (e) {
      throw new NotFoundException('User not found.')
    }
  }

  async store(body:StoreUserParams):Promise<User> {
    try {
      const newUser = User.create({...body})
      await newUser.save()
      return newUser
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  async edit(id:number, body:EditUserParams):Promise<User> {
    const updateUser = await User.findOne(id)
    if (!updateUser) throw new NotFoundException('User not found.')
    try {
      updateUser.setAttributes(body)
      await updateUser.save()
      return updateUser
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  async delete(id:number):Promise<void> {
    const deleteUser = await User.findOne(id)
    if(!deleteUser) throw new NotFoundException('User not found.')
    try {
      await deleteUser.remove()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }
}