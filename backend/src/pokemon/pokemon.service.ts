import { Injectable } from '@nestjs/common';
import { NewPokemonInput } from './dto/new-pokemon.input';
import { Pokemon } from '@prisma/client';
import { PokemonArgs } from './dto/pokemon.args';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async create(data: NewPokemonInput): Promise<Pokemon> {
    return this.prisma.pokemon.create({
      data: {
        ...data,
        creationDate: new Date(),
      },
    });
  }

  async findOneById(id: number): Promise<Pokemon | null> {
    return this.prisma.pokemon.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(pokemonArgs: PokemonArgs): Promise<Pokemon[]> {
    return this.prisma.pokemon.findMany({
      ...pokemonArgs,
    });
  }

  async remove(id: number): Promise<Pokemon | null> {
    return this.prisma.pokemon.delete({
      where: {
        id,
      },
    });
  }
}
