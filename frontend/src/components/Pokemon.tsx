interface Props {
  name: string;
  picture: string;
  id: number
  onClick?: (name: string, id: number) => void;
}

const Pokemon = ({ name, picture, id, onClick }: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick(name, id);
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