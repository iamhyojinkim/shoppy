export default function Banner() {
  return (
    <section className="h-96 relative">
      <div className="w-full h-full bg-cover bg-banner opacity-70" />
      <div className="absolute w-full top-1/3 text-center text-gray-50 drop-shadow">
        <h2 className="text-6xl text-gray-800">Shop With Us</h2>
        <div className="text-2xl text-black">High Quality, Best Products</div>
      </div>
    </section>
  );
}
