import React from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const NavBar = ({ totalPrice }) => {
  return (
    <Footer style={{ padding: 0, position: "fixed", bottom: 0, width: "100%" }}>
      <Menu mode="horizontal" style={{ textAlign: "center" }} theme="dark">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <NavLink to="/">Главная</NavLink>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ProfileOutlined />}>
          <NavLink to="/orders">Заказы</NavLink>
        </Menu.Item>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
          <NavLink to="/cart">
            Корзина <span className="cart-total">{totalPrice} ₽</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <NavLink to="/profile">Профиль</NavLink>
        </Menu.Item>
      </Menu>
    </Footer>
  );
};

export default NavBar;
