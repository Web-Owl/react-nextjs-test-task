import { useState, useEffect } from 'react';
import { fetchProducts, Product } from '../utils/api';

export function useProducts(pageSize: number = 20) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(page, pageSize);
        setProducts((prev) => [...prev, ...data.items]);
        setHasMore(() => {
          return products.length + data.items.length < data.total;
        });
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, pageSize, products]);

  function loadMore() {
    if (!loading && hasMore) {
      setPage((p) => p + 1);
    }
  }

  return { products, loading, error, loadMore, hasMore };
}