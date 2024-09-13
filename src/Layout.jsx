import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "./App.scss";

const Layout = ({ children, totalPrice }) => {
  return (
    <div className="app-container">
      <div className="content">{children}</div>

      <div className="fixed-icons">
        <NavLink to="/" className="icon-link">
          <HomeOutlined />
        </NavLink>
        <NavLink to="/orders" className="icon-link">
          <ProfileOutlined />
        </NavLink>
         <NavLink to="/cart" className="icon-link">
          <span className="cart-total">{totalPrice} ₽</span>
          <ShoppingCartOutlined />
        </NavLink>
        <NavLink to="/profile" className="icon-link">
          <UserOutlined />
        </NavLink>
      </div>
    </div>
  );
};

export default Layout;
