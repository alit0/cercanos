import React from 'react';
import type { Professional } from '../types';
import { ProfessionalCard } from './ProfessionalCard';

interface ListViewProps {
  professionals: Professional[];
  onProfessionalSelect: (professional: Professional) => void;
  favoriteProfessionalIds: string[];
  onToggleFavorite: (professionalId: string) => void;
  isUserLoggedIn: boolean;
}

export const ListView: React.FC<ListViewProps> = ({ professionals, onProfessionalSelect, favoriteProfessionalIds, onToggleFavorite, isUserLoggedIn }) => {
  return (
    <div className="divide-y divide-gray-200">
      {professionals.map(professional => (
        <ProfessionalCard 
          key={professional.id} 
          professional={professional} 
          onSelect={() => onProfessionalSelect(professional)}
          isFavorite={favoriteProfessionalIds.includes(professional.id)}
          onToggleFavorite={onToggleFavorite}
          isUserLoggedIn={isUserLoggedIn}
        />
      ))}
    </div>
  );
};