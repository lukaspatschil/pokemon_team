import React, { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

import Pokemon from './Pokemon';
import { useFetch } from '../hooks/useFetch';

const ADD_POKEMON = gql`
  mutation AddPokemons($name:String!, $pokeapiUrl:String!) {
    addPokemon(newPokemonData:{
      name: $name,
      pokeapiUrl: $pokeapiUrl
    }){
      id
    }
  }
`;

const Selection = () => {
  const pokemons = useFetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const [addPokemon, { data }] = useMutation(ADD_POKEMON);

  const addTeam = (name: string, id: number) => {
    addPokemon({
      variables: {
        name: name,
        pokeapiUrl: `https://pokeapi.co/api/v2/pokemon/${id}/`,
      }
    });
    window.location.reload()
  }

  return (
    <section className="App container">
      <h2>Select your pokemon:</h2>
      <div className="flex">
        {
          !pokemons.loading && pokemons?.data?.map((pokemon, id) => <Pokemon key={id} name={pokemon.name} id={pokemon.id} onClick={addTeam} picture={pokemon.sprites.front_default} />)
        }
      </div>
    </section>
  )
};

export default Selection;