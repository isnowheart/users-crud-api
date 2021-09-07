import { User } from "../../src/entities/User"
import * as faker from "faker"

type CreateUserParams = {
  username?: string
  email?: string
  password?: string
  admin?: boolean
}

async function create(params?:CreateUserParams):Promise<User> {
  const user = User.create({ 
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(),
    admin: true,
    ...params
  })

  return user.save()
}

export default { create }