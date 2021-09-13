import ApiFactory from "../../../../factories/ApiFactory"
import Provider from "../../../../../src/domains/users/Provider"
import UserFactory from "../../../../factories/UserFactory"
import { Connection, createConnection } from "typeorm"
import { INestApplication } from "@nestjs/common"
import { User } from "../../../../../src/entities/User"
import { UsersController } from  "../../../../../src/domains/users/UsersController"
import * as request from 'supertest'

let connection:Connection
let api:INestApplication
let user: User

beforeAll(async () => {
  connection = await createConnection()
  api = await ApiFactory.create({providers:[Provider], controllers:[UsersController]})
  await api.init()
  user = await UserFactory.create()
})

afterAll(async () => {
  await connection.close()
})

it('Should return users List', async () => {
  const response = await request(api.getHttpServer()).get('/users')
  expect(response.status).toBe(200)
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: user.id, username: user.username, email: user.email })
    ])
  )
})
