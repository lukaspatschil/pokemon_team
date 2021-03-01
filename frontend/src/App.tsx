import './App.css';

import Pokemon from './components/Pokemon';
import React from 'react';
import { useFetch } from './hooks/useFetch';

function App() {
  const pokemons = useFetch("https://pokeapi.co/api/v2/pokemon?limit=151");

  return (
    <section className="App">
      <div className="container flex">
        {
          !pokemons.loading && pokemons?.data?.map((pokemon, id) => <Pokemon key={id} name={pokemon.name} picture={pokemon.sprites.front_default} />)
        }
      </div>
    </section>
  );
}

export default App;
