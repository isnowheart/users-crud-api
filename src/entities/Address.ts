import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity('addresses')
export class Address extends BaseEntity {
  @Column({nullable:false})
  streetname: string

  @Column({nullable:false})
  number: string

  @Column({nullable:true})
  complement: string

  @Column({nullable:false})
  neighborhood: string
    
  @Column({nullable:false})
  city: string
  
  @Column({nullable:false})
  state: string
  
  @Column({nullable:false})
  zipcode: string

  @ManyToOne(() => User, (user) => user.addresses)
  user: User
}