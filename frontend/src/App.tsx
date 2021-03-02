import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

import Home from './components/Home';
import Navbar from './components/Navbar';
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
    <Router>
      <div>
        <Navbar />

        <Switch>
          <Route path="/pokemons">
            <Team loading={loading} error={error} data={pokemons} />
            <Selection localPokemon={addPokemon} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
