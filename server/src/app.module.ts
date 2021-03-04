import { Connection } from 'typeorm';
import { DatabaseModule } from './database/database.sqlite.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { join } from 'path';
@Module({
  imports: [
    DatabaseModule,
    PokemonModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {
    connection.synchronize();
  }
}
