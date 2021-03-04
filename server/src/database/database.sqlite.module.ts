import { Module } from '@nestjs/common';
import { Pokemon } from 'src/pokemon/pokemon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './mydb.sql',
      entities: [Pokemon],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
