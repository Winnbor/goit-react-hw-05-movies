export default function MovieGridCard({ result }) {
  const src = result?.poster_path
    ? `https://image.tmdb.org/t/p/w300${result?.poster_path}`
    : 'https://image.tmdb.org/t/p/w300/AvgrHw6YEehlNxVZNVDoVz2Huht.jpg';
  return (
    <>
      <img src={src} alt={result?.title ?? result?.name} width="300" />
      <p>{result?.title ?? result?.name}</p>
    </>
  );
}
