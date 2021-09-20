import { INestApplication } from "@nestjs/common"
import * as faker from 'faker'
import * as request from 'supertest'
import { Connection, createConnection } from "typeorm"
import { User } from "../../../../../src/entities/User"
import { UsersController } from  "../../../../../src/domains/users/UsersController"
import ApiFactory from "../../../../factories/ApiFactory"
import Provider from "../../../../../src/domains/users/Provider"
import UserFactory from "../../../../factories/UserFactory"

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

it('Should return an User', async () => {
  const params = { 
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  
  const response = await request(api.getHttpServer()).post('/users/').send(params)
  expect(response.status).toBe(201)
  expect(response.body).toEqual(
    expect.objectContaining({ username: params.username, email: params.email })
  )

  const storedUser = await User.findOne(response.body.id)
    expect(response.body).toEqual(
    expect.objectContaining({ username: storedUser.username, email: storedUser.email }),
  )
})


it('Should return a bad request error if not sending a valid email', async () => {
  const params = {
    username: faker.name.firstName(),
    email: faker.name.firstName(),
  }

  const response = await request(api.getHttpServer()).post('/users').send(params)
  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('response')
  expect(response.body.response).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ value: params.email, property: 'email', 
      constraints: expect.objectContaining({ isEmail: 'email must be an email' }) }),
    ]),
  )
})