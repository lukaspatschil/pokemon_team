import { DateScalar } from '../common/scalars/date.scalar';
import { Module } from '@nestjs/common';
import { Pokemon } from './pokemon.entity';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  providers: [PokemonResolver, PokemonService, DateScalar],
})
export class PokemonModule {}
