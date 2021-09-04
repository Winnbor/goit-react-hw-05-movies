export default function CastCard({ name, character, src }) {
  return (
    <div>
      {src && <img src={`https://image.tmdb.org/t/p/w300${src}`} alt={name} />}
      <h3>Actor: {name}</h3>
      <p>Character: {character}</p>
    </div>
  );
}
