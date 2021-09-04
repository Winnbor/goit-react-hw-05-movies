export default function ReviewCard({ name, text }) {
  return (
    <div>
      <h3>Author: {name}</h3>
      <p>{text}</p>
    </div>
  );
}
