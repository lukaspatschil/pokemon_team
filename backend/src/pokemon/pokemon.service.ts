import { Injectable, Logger } from '@nestjs/common';

import { NewPokemonInput } from './dto/new-pokemon.input';
import { Pokemon } from '@prisma/client';
import { PokemonArgs } from './dto/pokemon.args';
import { PrismaService } from 'src/prisma.service';

const logger = new Logger('PokemonService');

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async create(data: NewPokemonInput): Promise<Pokemon> {
    logger.log(`Creating Pokemon with ${JSON.stringify(data)}`);
    return this.prisma.pokemon.create({
      data: {
        ...data,
        creationDate: new Date(),
      },
    });
  }

  async findOneById(id: number): Promise<Pokemon | null> {
    logger.log(`Finding Pokemon with id ${id}`);
    return this.prisma.pokemon.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(pokemonArgs: PokemonArgs): Promise<Pokemon[]> {
    logger.log('Finding all Pokemon');
    return this.prisma.pokemon.findMany({
      ...pokemonArgs,
    });
  }

  async remove(id: number): Promise<Pokemon | null> {
    logger.log(`Removing Pokemon with id ${id}`);
    return this.prisma.pokemon.delete({
      where: {
        id,
      },
    });
  }
}
