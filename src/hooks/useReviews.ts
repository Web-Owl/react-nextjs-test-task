import useSWR from 'swr';
import { fetchReviews, Review } from '../utils/api';

export function useReviews() {
  const { data, error } = useSWR<Review[]>('reviews', fetchReviews, {
    revalidateOnFocus: false,
  });

  return {
    reviews: data,
    isLoading: !error && !data,
    isError: error,
  };
}