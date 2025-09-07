import React from 'react';
import type { Review } from '../types';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200/80">
      <div className="flex items-start space-x-4">
        <img 
          src={review.avatarUrl} 
          alt={review.author}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">{review.author}</p>
              <p className="text-xs text-gray-500">{review.date}</p>
            </div>
            <StarRating rating={review.rating} />
          </div>
          <p className="mt-2 text-gray-700">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
};
