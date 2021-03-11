import { Logger, NotFoundException } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewPokemonInput } from './dto/new-pokemon.input';
import { PokemonArgs } from './dto/pokemon.args';
import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './pokemon.service';

const pubSub = new PubSub();
const logger = new Logger('PokemonResolver');

@Resolver(() => Pokemon)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => Pokemon)
  async pokemon(@Args('id') id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonService.findOneById(id);
    logger.log(`Finding Pokemon with id ${id}`);
    if (!pokemon) {
      throw new NotFoundException(id);
    }
    return pokemon;
  }

  @Query(() => [Pokemon])
  pokemons(@Args() pokemonArgs: PokemonArgs): Promise<Pokemon[]> {
    logger.log('Finding all Pokemon');
    return this.pokemonService.findAll(pokemonArgs);
  }

  @Mutation(() => Pokemon)
  async addPokemon(
    @Args('newPokemonData') newPokemonData: NewPokemonInput,
  ): Promise<Pokemon> {
    const pokemon = await this.pokemonService.create(newPokemonData);
    logger.log(`Adding Pokemon with ${JSON.stringify(newPokemonData)}`);
    pubSub.publish('pokemonAdded', { pokemonAdded: pokemon });
    return pokemon;
  }

  @Mutation(() => Pokemon, { nullable: true })
  async removePokemon(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Pokemon | null> {
    logger.log(`Removing Pokemon with id ${id}`);
    return this.pokemonService.remove(id);
  }

  @Subscription(() => Pokemon)
  pokemonAdded() {
    return pubSub.asyncIterator('pokemonAdded');
  }
}
