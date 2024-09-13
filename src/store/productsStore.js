import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class ProductsStore {
  products = [];
  cartItems = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProducts() {
    try {
      const response = await axios.get(
        "https://ed6f97a297b5b5de.mokky.dev/items"
      );
      runInAction(() => {
        this.products = response.data;
      });
    } catch (error) {
      console.error("Ошибка загрузки продуктов:", error);
    }
  }

  async addToCart(product) {
    try {
      const existingCartItem = this.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingCartItem) {
        this.increment(product.id);
      } else {
        const response = await axios.post(
          "https://ed6f97a297b5b5de.mokky.dev/cart",
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            count: 1,
          }
        );

        runInAction(() => {
          this.cartItems.push({ ...product, count: 1 });
        });

        console.log("Продукт добавлен в корзину:", response.data);
      }
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error);
    }
  }

  increment(productId) {
    runInAction(() => {
      const item = this.cartItems.find((item) => item.id === productId);
      if (item) {
        item.count += 1;
      }
    });
  }

  decrement(productId) {
    runInAction(() => {
      const item = this.cartItems.find((item) => item.id === productId);
      if (item && item.count > 1) {
        item.count -= 1;
      } else {
        this.removeFromCart(productId);
      }
    });
  }

  removeFromCart(productId) {
    runInAction(() => {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    });
  }

  clearCart() {
    runInAction(() => {
      this.cartItems = [];
    });
  }
}

const productsStore = new ProductsStore();
export default productsStore;
