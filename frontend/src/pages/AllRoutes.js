import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SingleProduct from "./SingleProduct";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
