import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SingleProduct from "./SingleProduct";
import CartPage from "./CartPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import ShippingPage from "./ShippingPage";

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
      </Routes>
    </>
  );
};

export default AllRoutes;
