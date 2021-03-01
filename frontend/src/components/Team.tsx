import { gql, useQuery } from '@apollo/client';

import Pokemon from './Pokemon';
import { PokemonGraph } from '../interfaces/pokemon.interface';
import React from 'react';

const POKEMON_TEAM = gql`
  query GetPokemonTeam {
    pokemons{
      id,
      name,
      picture}
  }
`;

const Team = () => {
  const { loading, error, data } = useQuery(POKEMON_TEAM);

  if (loading) return <section className="App container">Loading...</section>;
  if (error) return <section className="App container">Error :(</section>;

  return (
    <section className="App container">
      <h2>Your Team:</h2>
      <div className="flex">
        {
          Array.isArray(data.pokemons) && data.pokemons.map((pokemon: PokemonGraph) => <Pokemon key={pokemon.id} name={pokemon.name} id={pokemon.id} picture={pokemon.picture} />)
        }
      </div>
    </section>
  );
};

export default Team;