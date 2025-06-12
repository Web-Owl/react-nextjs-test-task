import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  quantity: number;
}

const CART_STORAGE_KEY = 'cart';
const PHONE_STORAGE_KEY = 'phone';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    const storedPhone = localStorage.getItem(PHONE_STORAGE_KEY);
    if (storedPhone) {
      setPhone(storedPhone);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(PHONE_STORAGE_KEY, phone);
  }, [phone]);

  function addItem(id: number) {
    console.log(id);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { id, quantity: 1 }];
      }
    });
  }

  function removeItem(id: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function setItemQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) => {
        const exists = prev.find((item) => item.id === id);
        if (exists) {
          return prev.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
        } else {
          return [...prev, { id, quantity }];
        }
      });
    }
  }

  function clearCart() {
    setCart([]);
  }

  return {
    cart,
    addItem,
    removeItem,
    setItemQuantity,
    clearCart,
    phone,
    setPhone,
  };
}