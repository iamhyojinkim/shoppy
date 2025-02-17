import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProtectedRoute } from "../src/Components/ProtectedRoute";
import AllProducts from "../src/Components/AllProducts";
import NewProduct from "../src/Components/NewProduct";
import MyCart from "../src/Components/MyCart";
import ProductDetail from "../src/Components/ProductDetail";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<AllProducts />} />
          <Route path="products" element={<AllProducts />} />
          <Route
            path="products/new"
            element={
              <ProtectedRoute requireAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route
            path="carts"
            element={
              <ProtectedRoute>
                <MyCart />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
