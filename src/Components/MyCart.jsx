import { getCart } from "../api/firebase";
import { useAuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import CartItem from "./CartItem";

export default function MyCart() {
  const {
    user: { uid },
  } = useAuthContext();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["carts", uid],
    queryFn: () => getCart(uid),
  });
  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prv, current) => prv + parseInt(current.price) * current.quantity,
      0
    );
  const shipping = totalPrice === 0 ? 0 : 3;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-8 pt-2">My Cart</h2>
      {!hasProducts && (
        <p className="flex justify-center">There's nothing in your cart!😓</p>
      )}
      {hasProducts &&
        products.map((product) => {
          return <CartItem key={product.id} product={product} />;
        })}
      <div className="flex justify-between items-center text-lg font-semibold mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="text-gray-800">
          Price: <span className="text-black font-bold">${totalPrice}</span>
        </p>
        ➕
        <p className="text-gray-800">
          Shipping: <span className="text-black font-bold">${shipping}</span>
        </p>
        🟰
        <p className="text-white bg-brand px-4 py-2 rounded-md shadow-lg">
          Total Price:{" "}
          <span className="text-black font-bold">${totalPrice + shipping}</span>
        </p>
      </div>
    </>
  );
}
