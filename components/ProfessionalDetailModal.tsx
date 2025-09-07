import React from 'react';
import type { Professional, User } from '../types';
import { Icon } from './Icon';
import { StarRating } from './StarRating';
import { ReviewCard } from './ReviewCard';
import { AddReviewForm } from './AddReviewForm';

interface ProfessionalDetailModalProps {
  professional: Professional;
  onClose: () => void;
  currentUser: User | null;
  onAddReview: (professionalId: string, reviewData: { rating: number; comment: string }) => void;
}

export const ProfessionalDetailModal: React.FC<ProfessionalDetailModalProps> = ({ professional, onClose, currentUser, onAddReview }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <header className="p-4 sm:p-6 border-b border-gray-200 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full"
            aria-label="Cerrar"
          >
            <Icon name="X" className="w-6 h-6" />
          </button>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img 
              src={professional.photoUrl} 
              alt={professional.name} 
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0"
            />
            <div className="pt-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{professional.name}</h2>
              <p className="text-lg text-teal-600 font-semibold">{professional.specialty}</p>
              <div className="flex items-center mt-2 space-x-2 text-sm text-gray-600">
                <StarRating rating={professional.rating} />
                <span className="font-semibold">{professional.rating.toFixed(1)}</span>
                <span>({professional.reviewCount} opiniones)</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Acerca de</h3>
              <p className="text-gray-600 leading-relaxed">{professional.bio}</p>
            </div>
             <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Opiniones de Pacientes</h3>
                {professional.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {professional.reviews.map(review => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Todavía no hay opiniones para este profesional.</p>
                )}
            </div>
            
            {currentUser && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Deja tu Reseña</h3>
                <AddReviewForm 
                  professionalId={professional.id} 
                  onAddReview={onAddReview} 
                />
              </div>
            )}
          </div>
        </main>

        <footer className="p-4 sm:p-6 border-t border-gray-200 mt-auto bg-gray-50 rounded-b-2xl">
           <div className="flex flex-col sm:flex-row gap-3">
              <a 
                  href={`tel:${professional.phone}`} 
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
              >
                  <Icon name="Phone" className="w-5 h-5 mr-2" />
                  Llamar Ahora
              </a>
              <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(professional.address)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
              >
                  <Icon name="Navigation" className="w-5 h-5 mr-2" />
                  Obtener Indicaciones
              </a>
           </div>
        </footer>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};