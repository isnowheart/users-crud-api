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

it('Should return an User per ID', async () => {
  const response = await request(api.getHttpServer()).get(`/users/${user.id}`)
  expect(response.status).toBe(200)
  expect(response.body).toEqual(
    expect.objectContaining({ id: user.id, username: user.username, email: user.email })
  )

  it('Should return a not found user error', async () => {
    const response = await request(api.getHttpServer()).get(`/users/${user.id}123`)
  
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('statusCode')
    expect(response.body.statusCode).toEqual(response.status)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('User not found.')
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toEqual('Not Found')
  })
})
