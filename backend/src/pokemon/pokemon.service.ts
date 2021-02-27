import { Injectable } from '@nestjs/common';
import { NewPokemonInput } from './dto/new-pokemon.input';
import { Pokemon } from './models/pokemon.model';
import { PokemonArgs } from './dto/pokemon.args';

@Injectable()
export class PokemonService {
  async create(data: NewPokemonInput): Promise<Pokemon> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Pokemon> {
    return {} as any;
  }

  async findAll(pokemonArgs: PokemonArgs): Promise<Pokemon[]> {
    const glurak: Pokemon = {
      id: 'glurak1',
      name: 'Glurak',
      description: 'This is a glurak',
      creationDate: new Date(),
    };

    return [glurak] as Pokemon[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
