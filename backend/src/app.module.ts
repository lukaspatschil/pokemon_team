import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PokemonModule,
    UserModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
