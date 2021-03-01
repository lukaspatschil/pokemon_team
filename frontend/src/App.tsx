import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import React from 'react';
import Selection from './components/Selection';
import Team from './components/Team';

function App() {
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_URL ?? 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Team />
      <Selection />
    </ApolloProvider>
  );
}

export default App;
