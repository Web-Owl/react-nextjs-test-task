import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useReviews } from '../../hooks/useReviews';
import { Review } from '../../utils/api';

interface ReviewsProps {
  initialReviews: Review[];
}

export default function Reviews({ initialReviews }: ReviewsProps) {
  const { reviews: fetchedReviews, isLoading, isError } = useReviews();

  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  useEffect(() => {
    if (fetchedReviews && fetchedReviews.length > 0) {
      setReviews(fetchedReviews);
    }
  }, [fetchedReviews]);

  if (isLoading) return <p className="text-center py-4">Загрузка отзывов...</p>;
  if (isError) return <p className="text-center py-4 text-red-600">Ошибка загрузки отзывов</p>;

  return (
    <section className="my-8">
      {reviews && reviews.length === 0 && <p>Отзывов пока нет.</p>}
      <ul className="flex flex-col flex-wrap justify-center md:grid md:grid-cols-2 gap-5 md:gap-8 md:flex-row">
        {reviews?.map(({ id, text }) => (
          <li
            key={id}
            className="py-7 px-5 rounded-2xl dark:text-black dark:bg-[#D9D9D9]"
            dangerouslySetInnerHTML={{ __html: `<h2>Отзыв ${id}</h2> ${DOMPurify.sanitize(text)}` }}
          />
        ))}
      </ul>
    </section>
  );
}