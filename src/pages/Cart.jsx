import React from "react";
import { Button } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import OrderForm from "../OrderForm";

const Cart = ({ cartItems, setCartItems, addToCart, totalPrice }) => {
  const handleDecrement = (productId) => {
    const newCartItems = { ...cartItems };
    if (newCartItems[productId].count > 1) {
      newCartItems[productId].count -= 1;
      setCartItems(newCartItems);
      addToCart(-newCartItems[productId].price);
    } else {
      handleRemoveItem(productId);
    }
  };

  const handleIncrement = (productId) => {
    const newCartItems = { ...cartItems };
    newCartItems[productId].count += 1;
    setCartItems(newCartItems);
    addToCart(newCartItems[productId].price);
  };

  const handleRemoveItem = (productId) => {
    const newCartItems = { ...cartItems };
    const { [productId]: removedItem, ...remainingItems } = newCartItems;
    setCartItems(remainingItems);
    addToCart(-removedItem.price * removedItem.count);
  };

  const handleClearCart = () => {
    setCartItems({});
    addToCart(
      -Object.values(cartItems).reduce(
        (total, item) => total + item.price * item.count,
        0
      )
    );
  };

  return (
    <div>
      <h2>Корзина</h2>
      {Object.keys(cartItems).length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div>
          <ol>
            {Object.values(cartItems).map((item) => (
              <li key={item.id} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ width: "50px", marginRight: "10px" }}>
                    {item.image}
                  </span>

                  <div>
                    {item.name} - {item.count} шт. x {item.price} ₽ ={" "}
                    {item.count * item.price} ₽
                  </div>
                  <div
                    style={{ marginLeft: "auto", display: "flex", gap: "10px" }}
                  >
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => handleDecrement(item.id)}
                    />
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => handleIncrement(item.id)}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveItem(item.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              danger
              icon={<ClearOutlined />}
              onClick={handleClearCart}
            >
              Очистить корзину
            </Button>
          </div>
          {totalPrice !== 0 && (
            <OrderForm totalPrice={totalPrice} cartItems={cartItems} />
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
