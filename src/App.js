import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "./App.css";

import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import InstallPrompt from "./InstallPrompt";

const App = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState({}); // Теперь cartItems хранится в App.js

  console.log(cartItems);

  const addToCart = (price) => {
    setTotalPrice((prevPrice) => prevPrice + price);
  };

  const handleCartUpdate = (newCartItems) => {
    setCartItems(newCartItems); // Обновляем состояние корзины
  };

  return (
    <Router>
      <div className="app-container">
        <InstallPrompt />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  addToCart={addToCart}
                  cartItems={cartItems}
                  setCartItems={handleCartUpdate}
                />
              }
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        <div className="fixed-icons">
          <NavLink to="/" className="icon-link">
            <HomeOutlined />
          </NavLink>
          <NavLink to="/orders" className="icon-link">
            <ProfileOutlined />
          </NavLink>
          <NavLink to="/cart" className="icon-link">
            <ShoppingCartOutlined />
            <span className="cart-total">{totalPrice} ₽</span>
          </NavLink>
          <NavLink to="/profile" className="icon-link">
            <UserOutlined />
          </NavLink>
        </div>
      </div>
    </Router>
  );
};

export default App;
