import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async create(
    name: string,
    pictureUrl: string,
    description?: string,
  ): Promise<Pokemon> {
    return this.pokemonRepository.save({
      name,
      description,
      pictureUrl,
      creationDate: new Date(),
    });
  }

  async findOneById(id: number): Promise<Pokemon | null> {
    return this.pokemonRepository.findOne(id);
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.pokemonRepository.delete(id);
  }
}
