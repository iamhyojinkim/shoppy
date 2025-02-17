import React from "react";
import { useNavigate } from "react-router-dom";

export function ProductCard({ pdct }) {
  const navigate = useNavigate();
  const { id, price, image, title } = pdct;
  const handleClick = () => {
    navigate(`/products/${id}`, { state: pdct });
  };
  return (
    <>
      <li
        className="rounded-lg p-5 shadow-md overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <img className="w-45 rounded-lg" src={image} />
        <div>
          <h3>{title}</h3>
          <p>${price}</p>
        </div>
      </li>
    </>
  );
}
