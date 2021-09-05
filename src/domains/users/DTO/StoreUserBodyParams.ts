import { ApiProperty } from "@nestjs/swagger";

export class StoreUserBodyParams {
  @ApiProperty()
  username:string

  @ApiProperty()
  email:string 

  @ApiProperty()
  password: string
}