import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PaymentForm from "../paymentform";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, totalPrice, shipping } = location.state || {};

  const [cardValue, setCardValue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = {
      status: "preparing",
      totalPrice: totalPrice + shipping,
      shipTo: { ...shipInfo },
      products: products.map((p) => ({
        image: p.image,
        price: p.price,
        title: p.title,
        option: p.option,
        quantity: p.quantity,
      })),
      contact: shipInfo.contact,
    };

    try {
      const response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      const orderNum = data.data.orderNum;

      if (response.status === 200) {
        navigate(`/orderSuccess?orderNum=${orderNum}`, { state: { orderNum } });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setShipInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentInfoChange = (event) => {
    const { name, value } = event.target;
    setCardValue({ ...cardValue, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap">
        <div className="lg:w-7/12 w-full p-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="lastName"
                      className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="firstName"
                      className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contact"
                    className="block text-sm font-semibold"
                  >
                    Contact Number
                  </label>
                  <input
                    onChange={handleFormChange}
                    required
                    name="contact"
                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold"
                  >
                    Address
                  </label>
                  <input
                    placeholder="Apartment, studio, or floor"
                    onChange={handleFormChange}
                    required
                    name="address"
                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold"
                    >
                      City
                    </label>
                    <input
                      onChange={handleFormChange}
                      required
                      name="city"
                      className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-semibold"
                    >
                      Zip Code
                    </label>
                    <input
                      onChange={handleFormChange}
                      required
                      name="zip"
                      className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-2xl font-bold pb-5">
                    Payment Information
                  </h2>
                </div>

                <PaymentForm
                  cardValue={cardValue}
                  handleInputFocus={handleInputFocus}
                  handlePaymentInfoChange={handlePaymentInfoChange}
                />

                <button
                  type="submit"
                  className="mt-4 w-full py-2 bg-brand text-white font-semibold rounded-md
                   hover:bg-white hover:text-brand border border-transparent 
                   hover:border-brand transition"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:w-5/12 w-full p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Order Receipt</h2>

          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Product</th>
                <th className="border border-gray-300 p-2">Price</th>

                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="text-center">
                  <td className="border border-gray-300 p-2 flex items-center gap-2">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{p.title}</span>
                  </td>
                  <td className="border border-gray-300 p-2">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-2">{p.quantity}</td>
                  <td className="border border-gray-300 p-2">
                    ${(p.price * p.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 border-t border-gray-300 pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-2 border-t border-gray-400 pt-2">
              <span>Total Payment:</span>
              <span>${(totalPrice + shipping).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
