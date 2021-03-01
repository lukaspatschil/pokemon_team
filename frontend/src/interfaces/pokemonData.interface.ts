export default interface PokemonData {
  name: string;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  types: Type[];
}

interface Type {
  name: string;
  url: string;
}
