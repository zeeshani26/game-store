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
import UserListPage from "./UserListPage";
import UserEditPage from "./UserEditPage";
import ProductListPage from "./ProductListPage";
import ProductEditPage from "./ProductEditPage";
import OrderListPage from "./OrderListPage";

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
        <Route path="/admin/userlist" element={<UserListPage />} />
        <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
        <Route path="/admin/productlist" element={<ProductListPage />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
        <Route path="/admin/orderlist" element={<OrderListPage />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
