import { ApolloError, gql, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';

import Pokemon from './Pokemon';
import { PokemonGraph } from '../interfaces/pokemon.interface';

interface Props {
  loading: boolean;
  error: ApolloError | undefined
  data: PokemonGraph[] | undefined;
}

const REMOVE_POKEMON = gql`
mutation RemovePokemon($id:Int!) {
  removePokemon(id: $id) {
    id
    name
  }
}
`;

const Team = ({ loading, error, data }: Props) => {
  const [removePokemon, something] = useMutation(REMOVE_POKEMON);

  const removeTeam = (name: string, id: number) => {
    console.log(id);
    removePokemon({
      variables: {
        id,
      }
    });
    console.log(data?.filter(pokemon => pokemon.id !== id));
  };

  useEffect(() => {
    console.log(something);
  }, [something])

  if (loading) return <section className="container mx-auto mt-10 mb-5 md:mb-10">Loading...</section>;
  if (error) return <section className="container mx-auto mt-10 mb-5 md:mb-10">Error :(</section>;

  return (
    <section className="container mx-auto mt-10 mb-5 md:mb-10">
      <h2 className="text-3xl font-bold">Your Team:</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 xl:grid-cols-6">
        {
          Array.isArray(data) && data.map((pokemon: PokemonGraph) => <Pokemon key={pokemon.id} name={pokemon.name} id={pokemon.id} picture={pokemon.picture} onClick={removeTeam} />)
        }
      </div>
    </section>
  );
};

export default Team;