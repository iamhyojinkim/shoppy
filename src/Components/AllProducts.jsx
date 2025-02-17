import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import { ProductCard } from "./ProductCard";
import Banner from "./Banner";

export default function AllProducts() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error!😓</p>}
      <Banner />
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4">
        {products &&
          products.map((pdct) => {
            return <ProductCard key={pdct.id} pdct={pdct} />;
          })}
      </ul>
    </>
  );
}
