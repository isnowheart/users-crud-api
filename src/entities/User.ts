import { IsEmail } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { Address } from "./Address";
import { BaseEntity } from "./BaseEntity";

@Entity('users')
export class User extends BaseEntity {
  @Column({nullable:false, unique:true})
  username: string
  
  @Column({nullable:false, unique:true})
  @IsEmail()
  email: string

  @Column({nullable:false})
  password: string

  @Column({nullable:false, default:false})
  admin: boolean

  @OneToMany(() => Address, (address) => address.user)
  addresses: Array<Address>
}