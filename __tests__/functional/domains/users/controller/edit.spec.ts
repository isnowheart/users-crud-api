import ApiFactory from "../../../../factories/ApiFactory"
import Provider from "../../../../../src/domains/users/Provider"
import UserFactory from "../../../../factories/UserFactory"
import { Connection, createConnection } from "typeorm"
import { INestApplication } from "@nestjs/common"
import { User } from "../../../../../src/entities/User"
import { UsersController } from  "../../../../../src/domains/users/UsersController"
import * as faker from 'faker'
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

it('Should update and return User', async () => {
  const params = { 
    username: faker.name.firstName(),
    email: faker.internet.email()
  }

  const response = await request(api.getHttpServer()).put(`/users/${user.id}`).send(params)
  expect(response.status).toBe(200)
  expect(response.body).toEqual(
    expect.objectContaining({ username: params.username, email: params.email })
  )

  const storedUser = await User.findOne(user.id)
  expect(response.body).toEqual(
    expect.objectContaining({ username: storedUser.username, email: storedUser.email }),
  )
})

it('Should return a not found user error', async () => {
  const params = {
    username: faker.name.firstName(),
    email: faker.internet.email()
  }
  const response = await request(api.getHttpServer()).put(`/users/${user.id}123`).send(params)
  expect(response.status).toBe(404)
  expect(response.body).toHaveProperty('statusCode')
  expect(response.body.statusCode).toEqual(response.status)
  expect(response.body).toHaveProperty('message')
  expect(response.body.message).toEqual('User not found.')
  expect(response.body).toHaveProperty('error')
  expect(response.body.error).toEqual('Not Found')
})