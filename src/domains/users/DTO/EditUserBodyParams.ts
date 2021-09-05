import { ApiProperty } from "@nestjs/swagger";

export class EditUserBodyParams {
  @ApiProperty()
  username?:string

  @ApiProperty()
  email?:string 

  @ApiProperty()
  password?: string
}