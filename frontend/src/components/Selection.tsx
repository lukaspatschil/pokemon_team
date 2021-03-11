import React, { ChangeEvent, useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import Pokemon from './Pokemon';
import PokemonData from '../interfaces/pokemonData.interface';
import { PokemonGraph } from '../interfaces/pokemon.interface';
import { useFetch } from '../hooks/useFetch';

interface Props {
  localPokemon: (pokemon: PokemonGraph) => void;
}

const ADD_POKEMON = gql`
  mutation AddPokemons($name:String!, $picture:String!) {
    addPokemon(newPokemonData:{
      name: $name,
      picture: $picture
    }){
      id,
      name,
      picture
    }
  }
`;

const Selection = ({ localPokemon }: Props) => {
  const pokemons = useFetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const [addPokemon] = useMutation<{ addPokemon: PokemonGraph }>(ADD_POKEMON);

  const [filtered, setFiltered] = useState(pokemons);
  const [input, setInput] = useState('');

  useEffect(() => setFiltered(pokemons), [pokemons]);

  const addTeam = (name: string, id: number) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(data => data.json())
      .then((pokemon: PokemonData) => {
        addPokemon({
          variables: {
            name: pokemon.name,
            picture: pokemon.sprites.front_default,
          }
        })
          .then(res => res.data?.addPokemon ? localPokemon(res.data?.addPokemon) : '');
      });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setFiltered({ data: pokemons.data.filter(el => el.name.includes(e.target.value)), loading: false });
  }

  return (
    <section className="container mx-auto">
      <h2 className="text-3xl font-bold">Select your pokemon:</h2>
      <input className="mt-4 mb-4 border" type="text" onChange={handleChange} value={input} placeholder="Search..." />
      <hr className="mb-4" />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 xl:grid-cols-6">
        {
          !pokemons.loading && filtered?.data?.map((pokemon, id) => <Pokemon key={id} name={pokemon.name} id={pokemon.id} onClick={addTeam} picture={pokemon.sprites.front_default} />)
        }
      </div>
    </section>
  )
};

export default Selection;