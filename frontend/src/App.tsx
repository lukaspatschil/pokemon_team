import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import React from 'react';
import Selection from './components/Selection';
import Team from './components/Team';
import Test from './components/Test';

function App() {
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_URL ?? 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
  });

  const updatePokemon = () => {

  }

  return (
    <ApolloProvider client={client}>
      <Test />
      <Team />
      <Selection updatePokemon={updatePokemon} />
    </ApolloProvider>
  );
}

export default App;
