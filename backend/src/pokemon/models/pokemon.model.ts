import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pokemon {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;
}
