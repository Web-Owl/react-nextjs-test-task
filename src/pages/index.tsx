import type { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import Reviews from '../components/Reviews/Reviews';
import ProductList from '../components/ProductList/ProductList';
import CartSummary from '../components/CartSummary/CartSummary';
import { fetchReviews, fetchProducts, ProductsResponse, Review } from '../utils/api';

interface HomeProps {
  initialReviews: Review[];
  initialProducts: ProductsResponse;
}

const Home: NextPage<HomeProps> = ({ initialReviews, initialProducts }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-8xl text-center mb-8 dark:bg-[#777777] p-4 rounded-2xl font-normal">тестовое задание</h1>
      <Reviews initialReviews={initialReviews} />
      <CartSummary products={initialProducts.items} />
      <ProductList initialProducts={initialProducts.items} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const initialReviews = await fetchReviews();
  const initialProducts = await fetchProducts(1, 20);

  return {
    props: {
      initialReviews,
      initialProducts,
    },
  };
};

export default Home;