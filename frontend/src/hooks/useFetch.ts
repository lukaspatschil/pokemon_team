import { useEffect, useState } from "react";

import PokemonData from "../interfaces/pokemonData.interface";
import Pokemons from "../interfaces/pokemons.interface";

export const useFetch = (url: string) => {
  const [state, setState] = useState<{ data: PokemonData[]; loading: boolean }>(
    { data: [], loading: true }
  );
  const [id, setId] = useState<{ ids: Pokemons[] | null; loading: boolean }>({
    ids: null,
    loading: true,
  });

  useEffect(() => {
    setId((state) => ({ ids: id.ids, loading: true }));
    fetch(url)
      .then((x) => x.json())
      .then((y) => {
        setId({ ids: y.results, loading: false });
      });
  }, [url, setId]);

  useEffect(() => {
    setState((state) => ({ data: state.data, loading: true }));
    if (!id.loading) {
      id.ids?.forEach((el) => {
        console.log(el.name);
        fetch(el.url)
          .then((x) => x.json())
          .then((y) => {
            setState((pre) => ({ data: [...pre.data, y], loading: false }));
          });
      });
    }
  }, [id.loading, setState, id.ids]);

  return state;
};
