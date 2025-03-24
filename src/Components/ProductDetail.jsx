import { useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { addOrUpdateCart, login, getCart } from "../api/firebase";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { user } = useAuthContext();
  const uid = user ? user.uid : null;
  let popupInProgress = false;

  const location = useLocation();
  const pdct = location.state || {};
  const [success, setSuccess] = useState("");
  const { id, title, description, price, options, image } = pdct;
  const [selected, setSelected] = useState(options && options[0]);
  const [cartItems, setCartItems] = useState([]);

  const handleSelected = (e) => setSelected(e.target.value);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const items = await getCart(uid);
        setCartItems(items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);

  const handleMessages = (msg) => {
    setSuccess(msg);
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };

  const handleClick = async () => {
    if (popupInProgress) return;
    popupInProgress = true;

    try {
      if (!user) {
        await login();
      } else {
        const product = {
          id,
          title,
          description,
          price,
          option: selected,
          image,
          quantity: 1,
        };
        const isInCart = user && cartItems.some((itm) => itm.id === product.id);
        if (isInCart) {
          handleMessages("this item is already in your cart😊");
        } else {
          addOrUpdateCart(uid, product);
          handleMessages("SUCCESS!✅");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      popupInProgress = false;
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center gap-8 p-6 max-w-4xl mx-auto">
      <div className="w-full md:w-5/12">
        <img className="w-full rounded-lg shadow-md" src={image} alt={title} />
      </div>

      <div className="w-full md:w-7/12 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">💕{title}💕</h2>
        <p className="text-xl text-gray-700">${price}</p>
        <p className="text-gray-600">{description}</p>

        <div>
          <label className="block text-lg font-semibold mb-2">Options</label>
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleSelected}
            value={selected}
          >
            {options &&
              options.map((op, idx) => <option key={idx}>{op}</option>)}
          </select>
        </div>
        <div className="flex justify-center">{success}</div>
        <button
          onClick={handleClick}
          className="bg-brand text-white font-semibold py-2 px-6 rounded-md mt-4 
                   hover:bg-white hover:text-brand border border-transparent 
                   hover:border-brand transition"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}
