import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewPokemonInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  pokeapiID: number;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;
}
