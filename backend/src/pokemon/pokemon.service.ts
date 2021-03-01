import { Injectable } from '@nestjs/common';
import { NewPokemonInput } from './dto/new-pokemon.input';
import { Pokemon } from '@prisma/client';
import { PokemonArgs } from './dto/pokemon.args';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async create(data: NewPokemonInput): Promise<Pokemon | null> {
    return this.prisma.pokemon.create({
      data: {
        name: data.name,
        description: data.description,
        picture: data.picture,
        creationDate: new Date(),
      },
    });
  }

  async findOneById(pokemonId: number): Promise<Pokemon | null> {
    return this.prisma.pokemon.findUnique({
      where: {
        id: pokemonId,
      },
    });
  }

  async findAll(pokemonArgs: PokemonArgs): Promise<Pokemon[] | null> {
    return this.prisma.pokemon.findMany();
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
