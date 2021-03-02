import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { PokemonGraph } from './interfaces/pokemon.interface';
import Selection from './components/Selection';
import Team from './components/Team';

const POKEMON_TEAM = gql`
  query GetPokemonTeam {
    pokemons{
      id,
      name,
      picture}
  }
`;

function App() {
  const { loading, error, data } = useQuery(POKEMON_TEAM);
  const [pokemons, setPokemons] = useState<PokemonGraph[]>();

  useEffect(() => setPokemons(data?.pokemons), [data?.pokemons]);

  const addPokemon = (pokemon: PokemonGraph) => {
    console.log(data);
    if (pokemons) {
      setPokemons(pre => {
        if (pre) return [...pre, pokemon];
      });
    }
  }

  return (
    <>
      <Team loading={loading} error={error} data={pokemons} />
      <Selection localPokemon={addPokemon} />
    </>
  );
}

export default App;
