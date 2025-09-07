import React from 'react';
import type { Professional } from '../types';
import { StarRating } from './StarRating';
import { Icon } from './Icon';

interface ProfessionalCardProps {
  professional: Professional;
  onSelect: (professional: Professional) => void;
  isFavorite: boolean;
  onToggleFavorite: (professionalId: string) => void;
  isUserLoggedIn: boolean;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional, onSelect, isFavorite, onToggleFavorite, isUserLoggedIn }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(professional.id);
  };
  
  return (
    <div className="w-full text-left p-4 hover:bg-teal-50/50 transition-colors duration-200 cursor-pointer" onClick={() => onSelect(professional)}>
        <div className="flex flex-col sm:flex-row gap-4">
            <img 
                src={professional.photoUrl} 
                alt={professional.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md flex-shrink-0" 
            />
            <div className="flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-gray-800">{professional.name}</h3>
                <p className="text-teal-600 font-semibold">{professional.specialty}</p>
                <div className="flex items-center mt-1 space-x-2 text-sm text-gray-600">
                    <StarRating rating={professional.rating} />
                    <span className="font-semibold">{professional.rating.toFixed(1)}</span>
                    <span className="text-[10px] md:text-[14px]">({professional.reviewCount} opiniones)</span>
                </div>
                <p className="text-[12px] md:text-[16px] mt-2 text-gray-500 flex items-center">
                    <Icon name="location" className="w-4 h-4 mr-2 text-gray-400" />
                    {professional.address}
                </p>
                <div className="mt-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Acepta:</h4>
                    <div className="flex flex-wrap gap-2">
                        {professional.insurances.slice(0, 3).map(ins => (
                            <span key={ins} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                {ins}
                            </span>
                        ))}
                        {professional.insurances.length > 3 && (
                            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                +{professional.insurances.length - 3} más
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-3 items-stretch sm:items-end justify-start flex-shrink-0 pt-2">
                <div className="flex space-x-2">
                     {isUserLoggedIn && (
                        <button
                            onClick={handleFavoriteClick}
                            title={isFavorite ? 'Quitar de Mis Médicos' : 'Añadir a Mis Médicos'}
                            className={`inline-flex items-center justify-center p-2 border rounded-md transition-colors ${
                                isFavorite 
                                ? 'bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200'
                                : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        >
                            <Icon name={isFavorite ? 'bookmark-filled' : 'bookmark'} className="w-5 h-5" />
                        </button>
                    )}
                    <a 
                        href={`tel:${professional.phone}`} 
                        onClick={(e) => e.stopPropagation()}
                        className="flex-grow inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
                    >
                        <Icon name="phone" className="w-4 h-4 mr-2" />
                        Llamar
                    </a>
                </div>
                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(professional.address)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
                >
                    <Icon name="directions" className="w-4 h-4 mr-2" />
                    Cómo llegar
                </a>
            </div>
        </div>
    </div>
  );
};