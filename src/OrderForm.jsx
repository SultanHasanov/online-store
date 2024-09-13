import React, { useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const chat_id = "-1001811930704";
const token = "6199714726:AAEX2ajO1qyM4E8_ShQ9cMNJvn12HPFcZrg";

const OrderForm = ({ totalPrice, cartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [changeAmount, setChangeAmount] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === "cash") {
      setChangeAmount("");
    } else {
      setChangeAmount(null);
    }
  };

  const onFinish = async (values) => {
    try {
      const { name, phone, changeAmount } = values;

      // Формируем сообщение для Telegram
      let messageText = `<i>Новый заказ</i>\n`;
      messageText += `<b>Имя: </b>${name}\n`;
      messageText += `<b>Телефон: </b>${phone}\n`;
      messageText += `<b>Способ оплаты: </b>${
        paymentMethod === "cash" ? "Наличные" : "Перевод"
      }\n`;
      if (paymentMethod === "cash") {
        messageText += `<b>Сумма для сдачи: </b>${changeAmount}\n`;
      }
      messageText += `<b>Сумма заказа: </b>${totalPrice} ₽\n`;

      // Проверяем, что cartItems является массивом и формируем список товаров
      let itemsList = "<b>Товары:</b>\n";
      if (Array.isArray(cartItems)) {
        cartItems.forEach((item) => {
          itemsList += `<b>${item.title}:</b> ${item.count} шт. - ${
            item.price * item.count
          } ₽\n`;
        });
      } else {
        itemsList = "<b>Товары:</b> Нет данных\n";
      }

      messageText += itemsList;

      // Отправка сообщения в Telegram
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chat_id,
        parse_mode: "html",
        text: messageText,
      });

      // Очистка данных
      form.resetFields();
      message.success("Ваш заказ успешно оформлен!");

      // Редирект на страницу заказов
      navigate("/orders");
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      message.error("Ошибка при оформлении заказа.");
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: "Пожалуйста, введите ваше имя" }]}
      >
        <Input placeholder="Введите ваше имя" />
      </Form.Item>

      <Form.Item
        label="Номер телефона"
        name="phone"
        rules={[
          { required: true, message: "Пожалуйста, введите номер телефона" },
          { pattern: /^\+?\d{10,15}$/, message: "Введите корректный номер" },
        ]}
      >
        <Input placeholder="Введите номер телефона" />
      </Form.Item>

      <Form.Item label="Способ оплаты" name="paymentMethod">
        <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
          <Radio value="cash">Наличные</Radio>
          <Radio value="transfer">Перевод</Radio>
        </Radio.Group>
      </Form.Item>

      {paymentMethod === "cash" && (
        <Form.Item
          label="С какой суммы принести сдачу?"
          name="changeAmount"
          rules={[
            { required: true, message: "Введите сумму для сдачи" },
            { pattern: /^\d+$/, message: "Введите корректную сумму" },
          ]}
        >
          <Input
            placeholder="Введите сумму для сдачи"
            value={changeAmount}
            onChange={(e) => setChangeAmount(e.target.value)}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Оформить заказ
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrderForm;
