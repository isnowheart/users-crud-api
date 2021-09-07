import { INestApplication } from "@nestjs/common";
import { Test } from '@nestjs/testing'

type ApiCreateParams = { 
  providers:Array<any>
  controllers:Array<any>
}

async function create(params:ApiCreateParams):Promise<INestApplication>{
  const module = await Test.createTestingModule({ 
    providers:params.providers,
    controllers:params.controllers
  }).compile()
  return module.createNestApplication()
}

export default { create }