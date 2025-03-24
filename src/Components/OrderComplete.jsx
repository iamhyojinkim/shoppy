import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNum } = location.state || {};

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap justify-center items-center">
        <div className="lg:w-6/12 w-full p-6 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-brand mb-6">
            THANK YOU VERY MUCH!😊
          </h2>
          <p className="text-center text-lg text-gray-700 mb-4">
            Your order has been successfully placed.
          </p>
          <div className="text-center text-xl font-semibold text-gray-800">
            <h3>Order Number: {orderNum}</h3>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleBackToHome}
              className="py-2 px-6 bg-brand text-white font-semibold rounded-md
              hover:bg-white hover:text-brand border border-transparent 
              hover:border-brand transition"
            >
              Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
