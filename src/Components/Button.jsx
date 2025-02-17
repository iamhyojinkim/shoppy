export default function Button({ onClick, text }) {
  return (
    <>
      <button className="text-brand" onClick={onClick}>
        {text}
      </button>
    </>
  );
}
