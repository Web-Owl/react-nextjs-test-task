import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductItem from '../ProductItem/ProductItem';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../utils/api';

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const { products: fetchedProducts, loading, error, loadMore, hasMore } = useProducts(20);
  const { cart, addItem, removeItem, setItemQuantity } = useCart();

  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    if (fetchedProducts && fetchedProducts.length > 0) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  if (error) return <p className="text-center text-red-600 py-4">Ошибка загрузки товаров</p>;

  return (
    <section className="my-8">
      <div className='flex flex-wrap flex-col justify-center gap-4 md:flex-row md:gap-8'>
        {products.map((product, index) => {
          const cartItem = cart.find((item) => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;
          if (index === products.length - 1) {
            return (
              <div key={product.id} ref={lastProductRef}>
                <ProductItem
                  product={product}
                  quantity={quantity}
                  onAdd={() => addItem(product.id)}
                  onRemove={() => removeItem(product.id)}
                  onSetQuantity={(q) => setItemQuantity(product.id, q)}
                />
              </div>
            );
          }
          return (
            <ProductItem
              key={product.id}
              product={product}
              quantity={quantity}
              onAdd={() => addItem(product.id)}
              onRemove={() => removeItem(product.id)}
              onSetQuantity={(q) => setItemQuantity(product.id, q)}
            />
          );
        })}
        {loading && <p className="text-center py-4">Загрузка...</p>}
      </div>
    </section>
  );
}