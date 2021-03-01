import { gql, useMutation, useQuery } from '@apollo/client';

const POKEMONS = gql`
  query {
    pokemons {
      id,
      name,
      description
    }
  }
`;

const ADD_POKEMON = gql`
  mutation AddPokemons($name:String!, $pokeapiUrl:String!) {
    addPokemon(newPokemonData:{
      name: $name,
      pokeapiUrl: $pokeapiUrl
    }){
      id,
      name
    }
  }
`;

// const Test = () => {
//   const { loading, error, data } = useQuery(POKEMONS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   console.log(data);

//   return (
//     <section>

//     </section>
//   )
// };

const Test = () => {
  let input: HTMLInputElement | null;
  const [addTodo, { data }] = useMutation(ADD_POKEMON);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({
            variables: {
              name: input?.value,
              pokeapiUrl: "https://pokeapi.co/api/v2/pokemon/6/",
            }
          });
          if (input) input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default Test;