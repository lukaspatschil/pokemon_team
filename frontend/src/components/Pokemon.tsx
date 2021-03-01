interface Props {
  name: string;
  picture: string;
}

const Pokemon = ({ name, picture }: Props) => {
  return (
    <div className="card">
      <img src={picture} alt={name} />
      <h2>{name}</h2>
    </div>
  );
}

export default Pokemon;