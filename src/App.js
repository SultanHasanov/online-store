import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import InstallPrompt from "./InstallPrompt"; // Компонент для PWA
import NavBar from "./NavBar"; // Импортируем компонент панели навигации

const App = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState({});

  const addToCart = (price) => {
    setTotalPrice((prevPrice) => prevPrice + price);
  };

  const handleCartUpdate = (newCartItems) => {
    setCartItems(newCartItems);
  };

  return (
    <Router>
      <div style={{ minHeight: "100vh", paddingBottom: "60px" }}>
        {/* Контент приложения */}
        <InstallPrompt /> {/* Компонент для установки PWA */}
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

      {/* Фиксированная нижняя панель навигации */}
      <NavBar totalPrice={totalPrice} />
    </Router>
  );
};

export default App;
