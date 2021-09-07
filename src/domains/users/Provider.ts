import { Injectable } from '@nestjs/common'
import { User } from '../../entities/User'
import { EditUserParams, StoreUserParams } from '../users/DTO/UserParams'

@Injectable()
export default class Provider {
  async index():Promise<Array<User>> {
    const userList = await User.find()
    return userList
  }

  async show(id:number):Promise<User> {
    const getUser = await User.findOne(id)
    return getUser
  }

  async store(body:StoreUserParams):Promise<User> {
    const newUser = User.create({...body})
    await newUser.save()
    return newUser
  }

  async edit(id:number, body:EditUserParams):Promise<User> {
    const updateUser = await User.findOne(id)
    updateUser.setAttributes(body)
    await updateUser.save()
    return updateUser
  }

  async delete(id:number):Promise<void> {
    const deleteUser = await User.findOne(id)
    await deleteUser.remove() 
  }
}