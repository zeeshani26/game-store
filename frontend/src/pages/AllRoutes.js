import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SingleProduct from "./SingleProduct";
import CartPage from "./CartPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import ShippingPage from "./ShippingPage";
import PaymentPage from "./PaymentPage";
import OrderSummaryPage from "./OrderSummaryPage";
import OrderPage from "./OrderPage";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart/:id?" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order" element={<OrderSummaryPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
