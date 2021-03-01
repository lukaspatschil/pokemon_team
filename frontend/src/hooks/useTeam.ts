import { useEffect, useState } from "react";

import PokemonData from "../interfaces/pokemonData.interface";

export const useTeam = (pokemons: any[], loading: boolean) => {
  const [state, setState] = useState<{ data: PokemonData[]; loading: boolean }>(
    { data: [], loading: true }
  );

  useEffect(() => {
    if (!loading) {
      setState((state) => ({ data: state.data, loading: true }));
      pokemons.forEach((el) => {
        fetch(el.pokeapiUrl)
          .then((x) => x.json())
          .then((y) => {
            setState((pre) => ({ data: [...pre.data, y], loading: false }));
          });
      });
    }
  }, [setState, pokemons, loading]);

  return state;
};
