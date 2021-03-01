interface Props {
  name: string;
  picture: string;
  id: number
  addPokemon?: (name: string, id: number) => void;
}

const Pokemon = ({ name, picture, id, addPokemon }: Props) => {
  const handleClick = () => {
    if (addPokemon) {
      addPokemon(name, id);
    }
  }
  return (
    <div className="card" onClick={handleClick}>
      <img src={picture} alt={name} />
      <h2>{name}</h2>
    </div>
  );
}

export default Pokemon;