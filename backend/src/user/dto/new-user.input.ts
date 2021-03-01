import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @IsEmail()
  @MaxLength(30)
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  firstname: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  lastname: string;
}
