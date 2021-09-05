import { HttpException } from '@nestjs/common'
import { validate, ValidatorOptions } from 'class-validator'
import { BaseEntity as BaseEntityTypeORM, BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm'

export abstract class BaseEntity extends BaseEntityTypeORM {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  updatedAt: Date

  @BeforeUpdate()
  updateDate(): void {
    this.updatedAt = new Date()
  }

  @BeforeInsert()
  createDate(): void {
    this.createdAt = this.createdAt ? this.createdAt : new Date()
    this.updatedAt = this.createdAt ? this.createdAt : new Date()
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async validate(validatorOptions?: ValidatorOptions): Promise<void> {
    const errors = await validate(this, validatorOptions)
    if (errors.length > 0) {
      const e = errors.map(({ target, property, constraints }) => {
        return {
          entity: target.constructor.name,
          property,
          constraints: Object.keys(constraints),
        }
      })
      throw new HttpException(errors, 400)
    }
  }

  public setAttributes<T>(attributes: T): void {
    Object.keys(attributes).forEach(attribute => {
      this[attribute] = attributes[attribute]
    })
  }
}