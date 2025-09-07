import React, { useState } from 'react';
import { Icon } from './Icon';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  totalStars = 5, 
  interactive = false, 
  onRatingChange,
  size = 'w-5 h-5'
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (starValue: number) => {
    if (interactive) {
      setHoverRating(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const handleClick = (starValue: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={`flex items-center ${interactive ? 'cursor-pointer' : ''}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            role={interactive ? "button" : "presentation"}
            tabIndex={interactive ? 0 : undefined}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => interactive && handleClick(starValue)}
            onKeyDown={(e) => interactive && e.key === 'Enter' && handleClick(starValue)}
            className={`focus:outline-none p-0.5 ${interactive ? 'cursor-pointer' : ''}`}
            aria-label={interactive ? `Calificar con ${starValue} estrellas` : undefined}
          >
            {starValue <= displayRating ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${size} text-yellow-400`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${size} text-gray-300`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
};