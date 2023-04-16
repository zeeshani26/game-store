import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SingleProduct from "./SingleProduct";
import CartPage from "./CartPage";
import LoginPage from "./LoginPage";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart/:id?" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
