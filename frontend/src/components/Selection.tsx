import React, { ChangeEvent, useEffect, useState } from 'react';
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
  const [addPokemon] = useMutation(ADD_POKEMON);

  const [filtered, setFiltered] = useState(pokemons);
  const [input, setInput] = useState('');

  useEffect(() => setFiltered(pokemons), [pokemons]);

  const addTeam = (name: string, id: number) => {
    addPokemon({
      variables: {
        name: name,
        pokeapiUrl: `https://pokeapi.co/api/v2/pokemon/${id}/`,
      }
    });
    window.location.reload()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setFiltered({ data: pokemons.data.filter(el => el.name.includes(e.target.value)), loading: false });
  }

  return (
    <section className="App container">
      <h2>Select your pokemon:</h2>
      <input type="text" onChange={handleChange} value={input} name="" id="" />
      <div className="flex">
        {
          !pokemons.loading && filtered?.data?.map((pokemon, id) => <Pokemon key={id} name={pokemon.name} id={pokemon.id} onClick={addTeam} picture={pokemon.sprites.front_default} />)
        }
      </div>
    </section>
  )
};

export default Selection;