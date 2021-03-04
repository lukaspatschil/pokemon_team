import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Pokemon } from './pokemon.entity';
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
  pokemons(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Mutation(() => Pokemon)
  async addPokemon(
    @Args('name') name: string,
    @Args('pictureUrl') pictureUrl: string,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<Pokemon> {
    const pokemon = await this.pokemonService.create(
      name,
      pictureUrl,
      description,
    );
    pubSub.publish('pokemonAdded', { pokemonAdded: pokemon });
    return pokemon;
  }

  @Mutation(() => Pokemon, { nullable: true })
  async removePokemon(@Args('id') id: number) {
    return this.pokemonService.remove(id);
  }

  @Subscription(() => Pokemon)
  pokemonAdded() {
    return pubSub.asyncIterator('pokemonAdded');
  }
}
