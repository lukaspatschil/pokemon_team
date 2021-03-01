import { Field, ID, ObjectType } from '@nestjs/graphql';

import { IsEmail } from 'class-validator';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  lastname: string;

  @Field()
  creationDate: Date;
}
