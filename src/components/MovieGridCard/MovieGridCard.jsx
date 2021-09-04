export default function MovieGridCard({ result }) {
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
        alt={result.title}
      />
      <p>{result.title ?? result.name}</p>
    </>
  );
}
