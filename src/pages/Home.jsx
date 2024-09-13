import React, { useEffect, useState } from "react";
import { Card, Button, Spin } from "antd";

const Home = ({ addToCart, cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);

  

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ed6f97a297b5b5de.mokky.dev/items"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      }
    };
    fetchProducts();
  }, []); // Оставляем пустой массив зависимостей для запроса данных один раз

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
    } else {
      // Удаляем товар из корзины, если его количество стало 0
      const { [productId]: removedItem, ...remainingItems } = newCartItems;
      setCartItems(remainingItems);
      addToCart(-removedItem.price * removedItem.count);
    }
  };

  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <Spin size="SpinSize" />
      ) : (
        products.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            extra={<span>{product.image}</span>}
            style={{
              height: "max-content",
              width: "100%",
              maxWidth: "130px",
            }}
            bodyStyle={{ padding: "5px" }}
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
              <div className="card-controls-btn">
                <Button onClick={() => handleAddToCart(product)}>
                  В корзину
                </Button>
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  );
};

export default Home;
