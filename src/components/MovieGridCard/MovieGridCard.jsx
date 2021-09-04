export default function MovieGridCard({ result }) {
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w300${
          result.poster_path ?? result.backdrop_path
        }`}
        alt={result.title ?? result.name}
        width="300"
      />
      <p>{result.title ?? result.name}</p>
    </>
  );
}
