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
import PaymentPage from "./Components/PaymentPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderComplete from "./Components/OrderComplete";
import MyPage from "./Components/MyPage";

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
          <Route
            path="mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="mypage" element={<MyPage />} />
          <Route
            path="mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="products/order" element={<PaymentPage />} />
          <Route
            path="order"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route path="products/orderSuccess" element={<OrderComplete />} />
          <Route
            path="orderSuccess"
            element={
              <ProtectedRoute>
                <OrderComplete />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
