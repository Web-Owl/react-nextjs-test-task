import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItem, removeItem, setItemQuantity } from '../../store/cartSlice';
import { Product } from '../../utils/api';
import Image from 'next/image';

interface Props {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onSetQuantity: (q: number) => void;
}

export default function ProductItem({ product }: Props) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cart.cart.find((i) => i.id === product.id));
  const quantity = cartItem ? cartItem.quantity : 0;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const [inputValue, setInputValue] = useState(quantity.toString());

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setInputValue(val);
      const num = parseInt(val, 10);
      if (!isNaN(num)) {
        dispatch(setItemQuantity({ id: product.id, quantity: num }));
      } else {
        dispatch(setItemQuantity({ id: product.id, quantity: 0 }));
      }
    }
  }

  if (!isClient) {
    return (
      <button className="dark:text-[#D9D9D9] dark:bg-black px-4 py-2 rounded cursor-not-allowed opacity-50" disabled>
        Загрузка...
      </button>
    );
  }

  return (
    <div className="flex flex-col md:w-xs gap-4 border border-gray-300 rounded-lg p-2.5 dark:text-black items-center dark:bg-[#D9D9D9]">
      <Image
        src={product.image_url}
        alt={product.title}
        width={281}       // укажите реальные размеры
        height={366}
        className="object-contain rounded-xl"
      />
      <div className="flex-1 min-w-0">
        <h3 title={product.title} className="text-lg font-medium truncate text-center">
          {product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title}
        </h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="mt-2 text-2xl text-center">цена: {product.price.toLocaleString('ru-RU')} ₽</p>
      </div>
      <div className="min-w-[120px] text-center self-stretch">
        {quantity === 0 ? (
          <button
            onClick={() => dispatch(addItem(product.id))}
            className="dark:text-white dark:bg-[#222222] rounded-xl px-4 py-2 transition w-full cursor-pointer"
          >
            Купить
          </button>
        ) : (
          <div className="flex gap-2 ">
            <button
              onClick={() => dispatch(removeItem(product.id))}
              aria-label="Уменьшить количество"
              className="dark:text-white dark:bg-[#222222] rounded-xl transition cursor-pointer basis-10 px-4 py-2"
            >
              -
            </button>
            <input
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={handleInputChange}
              aria-label="Количество товара"
              maxLength={5}
              className="w-12 text-center dark:text-white dark:bg-[#222222] rounded-xl grow px-4 py-2"
            />
            <button
              onClick={() => dispatch(addItem(product.id))}
              aria-label="Увеличить количество"
              className="dark:text-white dark:bg-[#222222] rounded-xl transition cursor-pointer basis-10 px-4 py-2"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}