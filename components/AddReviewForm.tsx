import React, { useState } from 'react';
import { StarRating } from './StarRating';

interface AddReviewFormProps {
  professionalId: string;
  onAddReview: (professionalId: string, reviewData: { rating: number; comment: string }) => void;
}

export const AddReviewForm: React.FC<AddReviewFormProps> = ({ professionalId, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === '') return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onAddReview(professionalId, { rating, comment });
      // Reset form
      setRating(0);
      setComment('');
      setIsSubmitting(false);
    }, 500);
  };

  const isFormValid = rating > 0 && comment.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-lg border border-gray-200/80">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tu valoración:</label>
          <StarRating 
            rating={rating} 
            interactive={true} 
            onRatingChange={setRating}
            size="w-7 h-7"
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Tu opinión:</label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            placeholder="Comparte tu experiencia con este profesional..."
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
             {isSubmitting ? 'Publicando...' : 'Publicar Reseña'}
          </button>
        </div>
      </div>
    </form>
  );
};