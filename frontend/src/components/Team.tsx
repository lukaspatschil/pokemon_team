import { gql, useQuery } from '@apollo/client';

import Pokemon from './Pokemon';
import React from 'react';
import { useTeam } from '../hooks/useTeam';

const POKEMON_TEAM = gql`
  query GetPokemonTeam {
    pokemons{
      id,
      name,
      pokeapiUrl}
  }
`;

const Team = () => {
  const { loading, error, data } = useQuery(POKEMON_TEAM);

  const pokemons = useTeam(data?.pokemons, loading);

  if (loading) return <section className="App container">Loading...</section>;
  if (error) return <section className="App container">Error :(</section>;

  return (
    <section className="App container">
      <h2>Your Team:</h2>
      <div className="flex">
        {
          Array.isArray(pokemons.data) && pokemons.data.map((pokemon, id) => <Pokemon key={id} name={pokemon.name} id={pokemon.id} picture={pokemon.sprites.front_default} />)
        }
      </div>
    </section>
  );
};

export default Team;