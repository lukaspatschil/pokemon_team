import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Pokemon from './components/Pokemon';
import React from 'react';
import Team from './components/Team';
import Test from './components/Test';
import { useFetch } from './hooks/useFetch';

function App() {
  const pokemons = useFetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_URL ?? 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Test />
      <Team />
      <section className="App container">
        <h2>Select your pokemon:</h2>
        <div className="flex">
          {
            !pokemons.loading && pokemons?.data?.map((pokemon, id) => <Pokemon key={id} name={pokemon.name} picture={pokemon.sprites.front_default} />)
          }
        </div>
      </section>
    </ApolloProvider>
  );
}

export default App;
