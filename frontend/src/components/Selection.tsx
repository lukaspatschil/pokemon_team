import PokeAPI, { IPokemon } from "pokeapi-typescript";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import Pokemon from './Pokemon';
import { PokemonGraph } from '../interfaces/pokemon.interface';

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
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [addPokemon] = useMutation<{ addPokemon: PokemonGraph }>(ADD_POKEMON);

  const [filtered, setFiltered] = useState(pokemons);
  const [input, setInput] = useState('');

  useEffect(() => {
    const temp = [];
    for (let i = 1; i <= 151; i++) {
      temp.push(PokeAPI.Pokemon.fetch(i));
    }
    Promise.all(temp)
      .then(pokemons => { setPokemons(pokemons) })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => setFiltered(pokemons), [pokemons]);

  const addTeam = (name: string, id: number) => {
    PokeAPI.Pokemon.fetch(id)
      .then(pokemon => addPokemon({ variables: { name: pokemon.name, picture: pokemon.sprites.front_default } }));
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setFiltered(pokemons.filter(el => el.name.includes(e.target.value)));
  }

  return (
    <section className="container mx-auto">
      <h2 className="text-3xl font-bold">Select your pokemon:</h2>
      <input className="mt-4 mb-4 border" type="text" onChange={handleChange} value={input} placeholder="Search..." />
      <hr className="mb-4" />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 xl:grid-cols-6">
        {
          Array.isArray(filtered) && filtered?.map((pokemon, id) => <Pokemon key={id} name={pokemon.name} id={pokemon.id} onClick={addTeam} picture={pokemon.sprites.front_default} />)
        }
      </div>
    </section>
  )
};

export default Selection;