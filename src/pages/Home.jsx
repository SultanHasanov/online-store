import React from "react";
import { Card, Button } from "antd";
import { products } from "../products";

const Home = ({ addToCart, cartItems, setCartItems }) => {
  const handleAddToCart = (product) => {
    const newCartItems = { ...cartItems };
    if (newCartItems[product.id]) {
      newCartItems[product.id].count += 1;
    } else {
      newCartItems[product.id] = { ...product, count: 1 };
    }
    setCartItems(newCartItems); // Обновляем глобальный стейт cartItems через App.js
    addToCart(product.price);
  };

  const handleIncrement = (productId) => {
    const newCartItems = { ...cartItems };
    newCartItems[productId].count += 1;
    setCartItems(newCartItems);
    addToCart(newCartItems[productId].price);
  };

  const handleDecrement = (productId) => {
    const newCartItems = { ...cartItems };
    if (newCartItems[productId].count > 1) {
      newCartItems[productId].count -= 1;
      setCartItems(newCartItems);
      addToCart(-newCartItems[productId].price);
    }
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.name}
          extra={<span>{product.image}</span>}
          style={{
            width: "100%",
            maxWidth: "150px",
          }} /* Уменьшаем максимальную ширину карточек */
          bodyStyle={{ padding: "10px" }}
        >
          <p>Цена: {product.price} ₽</p>
          <p>
            <s>Старая цена: {product.oldPrice} ₽</s>
          </p>
          {cartItems[product.id] ? (
            <div className="card-controls">
              <Button onClick={() => handleDecrement(product.id)}>➖</Button>
              <span>{cartItems[product.id].count}</span>
              <Button onClick={() => handleIncrement(product.id)}>➕</Button>
            </div>
          ) : (
            <Button onClick={() => handleAddToCart(product)}>В корзину</Button>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Home;
