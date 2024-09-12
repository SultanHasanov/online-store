import React from "react";

const Cart = ({ cartItems }) => {
  return (
    <div>
      <h2>Корзина</h2>
      {Object.keys(cartItems).length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ol>
          {Object.values(cartItems).map((item) => (
            <li key={item.id}>
              {item.image}
              {item.name} - {item.count} шт. x {item.price} ₽ ={" "}
              {item.count * item.price} ₽
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Cart;
