import { DateScalar } from '../common/scalars/date.scalar';
import { Module } from '@nestjs/common';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PokemonResolver, PokemonService, DateScalar, PrismaService],
})
export class PokemonModule {}
