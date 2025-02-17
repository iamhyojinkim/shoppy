import { addOrUpdateCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "./AuthContext";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";

const options = ["S", "M", "L"];

export default function CartItem({ product }) {
  const queryClient = useQueryClient();
  const {
    user: { uid },
  } = useAuthContext();
  const { id, title, image, option, quantity, price } = product;
  const [selected, setSelected] = useState(option);

  const handleSubmit = () => {
    if (quantity < 2) return;
    addOrUpdateCart(uid, { ...product, quantity: quantity - 1 });
    queryClient.invalidateQueries(["cart"]);
  };
  const handleAdd = () => {
    if (quantity > 10) return;
    addOrUpdateCart(uid, { ...product, quantity: quantity + 1 });
    queryClient.invalidateQueries(["cart"]);
  };
  const handleRemove = () => {
    removeFromCart(uid, id);
    queryClient.invalidateQueries(["cart"]);
  };
  const handleSelected = async (e) => {
    const newOption = e.target.value;
    setSelected(newOption);
    await addOrUpdateCart(uid, { ...product, option: newOption }); //
    queryClient.invalidateQueries(["carts", uid]);
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white rounded-lg shadow-md mb-6">
          <div className="w-32 h-32 md:w-40 md:h-40">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image}
              alt={title}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
            <div className="flex flex-col items-start space-y-2">
              <h3 className="text-xl font-semibold">{title}</h3>
              <div>
                <label className="block text-xs mb-2">Options</label>
                <select
                  className="border border-gray-300 rounded-md p-2 w-full"
                  onChange={handleSelected}
                  value={selected}
                >
                  {options &&
                    options.map((op, idx) => <option key={idx}>{op}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={handleSubmit}
                className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={handleAdd}
                className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            <div className="flex items-center mt-4 md:mt-0 space-x-4">
              <p className="text-lg font-semibold">${price}</p>
              <button
                onClick={handleRemove}
                className="text-red-600 hover:text-red-800 transition"
              >
                <BsTrash size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
