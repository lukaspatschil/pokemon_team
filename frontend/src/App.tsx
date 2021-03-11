import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';

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
    if (pokemons) {
      setPokemons(pre => {
        toast.success('Successfully added Pokemon to the team!');
        if (pre) return [...pre, pokemon];
      });
    }
  }

  const removePokemon = (id: number) => {
    if (pokemons) {
      setPokemons(pre => {
        toast.success('Successfully removed Pokemon from the team!')
        if (pre) return pre?.filter(pokemon => pokemon.id !== id)
      })
    }
  }

  return (
    <Router>
      <div>
        <Navbar />

        <Switch>
          <Route path="/pokemons">
            <Toaster />
            <Team loading={loading} error={error} data={pokemons} deletePokemon={removePokemon} />
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
