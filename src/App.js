import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Layout from "./Layout";

const App = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState({});

  console.log(cartItems);
  console.log(totalPrice);

  // Загрузка корзины и totalPrice из localStorage при загрузке страницы
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    const savedTotalPrice = localStorage.getItem("totalPrice");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedTotalPrice) {
      setTotalPrice(Number(savedTotalPrice));
    }
  }, []);

  // Сохраняем корзину в localStorage при каждом изменении cartItems
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems"); // Очищаем localStorage, если корзина пустая
    }
  }, [cartItems]);

  // Сохраняем totalPrice в localStorage при каждом изменении totalPrice
  useEffect(() => {
    localStorage.setItem("totalPrice", totalPrice);
  }, [totalPrice]);

  const addToCart = (price) => {
    setTotalPrice((prevPrice) => prevPrice + price);
  };

  const handleCartUpdate = (newCartItems) => {
    setCartItems(newCartItems);
  };

  return (
    <Router>
      <Layout totalPrice={totalPrice}>
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
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                addToCart={addToCart}
                totalPrice={totalPrice}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
