import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pokemon {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  pokeapiUrl: string;

  @Field()
  creationDate: Date;
}