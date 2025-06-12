import React, { useState, useEffect } from 'react';
import PhoneInput from '../PhoneInput/PhoneInput';
import { sendOrder } from '../../utils/api';
import OrderPopup from '../OrderPopup/OrderPopup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart, setPhone } from '../../store/cartSlice';
import { Product } from '../../utils/api';

interface CartSummaryProps {
  products: Product[];
}

export default function CartSummary({ products }: CartSummaryProps) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const cartItems = cart
    .map(({ id, quantity }) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      return { ...product, quantity };
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  const phone = useAppSelector((state) => state.cart.phone);

  const [isClient, setIsClient] = useState(false);

  const [phoneError, setPhoneError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  function validatePhone(phoneStr: string) {
    const digits = phoneStr.replace(/\D/g, '');
    return digits.length === 11;
  }

  async function handleOrder() {
    setOrderError(null);
    if (!validatePhone(phone)) {
      setPhoneError(true);
      return;
    }
    if (cart.length === 0) {
      setOrderError('Корзина пуста');
      return;
    }
    setPhoneError(false);
    setLoading(true);
    try {
      const response = await sendOrder({
        phone: phone.replace(/\D/g, ''),
        cart,
      });
      if (response.success === 1) {
        setPopupVisible(true);
        dispatch(clearCart());
      } else {
        setOrderError(response.error || 'Ошибка при оформлении заказа');
      }
    } catch {
      setOrderError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <section className="rounded-2xl py-2.5 px-3 max-w-md mx-auto my-8 dark:text-black dark:bg-[#D9D9D9]">
      <p className="font-normal text-4xl mb-4 ">
        Добавленные товары
      </p>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {cartItems.map(({ id, title, price, quantity }) => (
            <li key={id} className="flex justify-between py-1">
              <span>{title} x{quantity}</span>
              <span>{(price * quantity).toLocaleString('ru-RU')} ₽</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col gap-2 md:gap-4 md:flex-row">
        <PhoneInput value={phone} onChange={(val) => dispatch(setPhone(val))} error={phoneError} />
        {orderError && <p className="text-red-600 mb-4">{orderError}</p>}
        <button
          onClick={handleOrder}
          disabled={loading}
          className={`w-full py-3 text-white font-normal transition rounded-2xl cursor-pointer ${
            loading ? 'cursor-not-allowed' : 'dark:bg-[#222222]'
          }`}
        >
          {loading ? 'Отправка...' : 'Заказать'}
        </button>
      </div>
      <OrderPopup visible={popupVisible} onClose={() => setPopupVisible(false)} />
    </section>
  );
}