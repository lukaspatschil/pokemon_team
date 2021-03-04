import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pokemon {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  picture: string;

  @Field()
  creationDate: Date;
}
