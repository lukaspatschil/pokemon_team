import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewPokemonInput } from './dto/new-pokemon.input';
import { PokemonArgs } from './dto/pokemon.args';
import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './pokemon.service';

const pubSub = new PubSub();

@Resolver(() => Pokemon)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => Pokemon)
  async pokemon(@Args('id') id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonService.findOneById(id);
    if (!pokemon) {
      throw new NotFoundException(id);
    }
    return pokemon;
  }

  @Query(() => [Pokemon])
  pokemons(@Args() pokemonArgs: PokemonArgs): Promise<Pokemon[]> {
    return this.pokemonService.findAll(pokemonArgs);
  }

  @Mutation(() => Pokemon)
  async addPokemon(
    @Args('newPokemonData') newPokemonData: NewPokemonInput,
  ): Promise<Pokemon> {
    const pokemon = await this.pokemonService.create(newPokemonData);
    pubSub.publish('pokemonAdded', { pokemonAdded: pokemon });
    return pokemon;
  }

  @Mutation(() => Pokemon, { nullable: true })
  async removePokemon(@Args('id') id: number): Promise<Pokemon | null> {
    return this.pokemonService.remove(id);
  }

  @Subscription(() => Pokemon)
  pokemonAdded() {
    return pubSub.asyncIterator('pokemonAdded');
  }
}
