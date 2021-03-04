import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewPokemonInput } from './dto/new-pokemon.input';
import { PokemonArgs } from './dto/pokemon.args';
import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './pokemon.service';

const pubSub = new PubSub();

@Resolver((of) => Pokemon)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query((returns) => Pokemon)
  async pokemon(@Args('id') id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonService.findOneById(id);
    if (!pokemon) {
      throw new NotFoundException(id);
    }
    return pokemon;
  }

  @Query((returns) => [Pokemon])
  pokemons(@Args() pokemonArgs: PokemonArgs): Promise<Pokemon[]> {
    return this.pokemonService.findAll(pokemonArgs);
  }

  @Mutation((returns) => Pokemon)
  async addPokemon(
    @Args('newPokemonData') newPokemonData: NewPokemonInput,
  ): Promise<Pokemon> {
    const pokemon = await this.pokemonService.create(newPokemonData);
    pubSub.publish('pokemonAdded', { pokemonAdded: pokemon });
    return pokemon;
  }

  @Mutation((returns) => Pokemon, { nullable: true })
  async removePokemon(@Args('id') id: number) {
    return this.pokemonService.remove(id);
  }

  @Subscription((returns) => Pokemon)
  pokemonAdded() {
    return pubSub.asyncIterator('pokemonAdded');
  }
}
