import React, { useState } from 'react';
import type { Professional } from '../types';
import { ListView } from './ListView';
import { MapView } from './MapView';
import { Icon } from './Icon';
import { Filters } from './Filters';

interface ResultsViewProps {
  professionals: Professional[];
  viewMode: 'list' | 'map';
  onViewModeChange: (mode: 'list' | 'map') => void;
  onProfessionalSelect: (professional: Professional) => void;
  favoriteProfessionalIds: string[];
  onToggleFavorite: (professionalId: string) => void;
  isUserLoggedIn: boolean;
  specialties: string[];
  insurances: string[];
  selectedSpecialties: string[];
  onSpecialtyChange: React.Dispatch<React.SetStateAction<string[]>>;
  selectedInsurances: string[];
  onInsuranceChange: React.Dispatch<React.SetStateAction<string[]>>;
  minRating: number;
  onRatingChange: (rating: number) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ 
  professionals, 
  viewMode, 
  onViewModeChange, 
  onProfessionalSelect,
  favoriteProfessionalIds,
  onToggleFavorite,
  isUserLoggedIn,
  specialties,
  insurances,
  selectedSpecialties,
  onSpecialtyChange,
  selectedInsurances,
  onInsuranceChange,
  minRating,
  onRatingChange
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Calcular el número de filtros activos
  const activeFiltersCount = selectedSpecialties.length + 
    selectedInsurances.length + 
    (minRating > 0 ? 1 : 0);
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-teal-600 flex justify-between items-center">
          <div className="hidden md:flex flex-col">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Resultados</h2>
            <p className="text-[14px] md:text-lg text-gray-500">{professionals.length} profesionales encontrados</p>
          </div>
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setIsFiltersOpen(true)}
              className={`px-3 py-1.5 rounded-md transition-colors text-sm font-medium 
                ${activeFiltersCount > 0 ? 'text-teal-600' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <Icon name="filter" className="inline-block mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 w-5 ml-1 rounded-full bg-teal-500 text-xs font-semibold text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`px-3 py-1.5 rounded-md transition-colors text-sm font-medium ${
                viewMode === 'list' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon name="List" className="inline-block mr-2" />
              Lista
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              className={`px-3 py-1.5 rounded-md transition-colors text-sm font-medium ${
                viewMode === 'map' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
               <Icon name="Map" className="inline-block mr-2" />
              Mapa
            </button>
          </div>
        </div>
        
        {professionals.length === 0 ? (
          <div className="p-16 text-center">
              <div className="text-gray-400 mx-auto h-16 w-16">
                   <Icon name="SearchX" />
              </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">No se encontraron resultados</h3>
            <p className="mt-1 text-gray-500">Intenta ajustar tu búsqueda o filtros.</p>
          </div>
        ) : (
          <div>
            {viewMode === 'list' ? (
              <ListView 
                professionals={professionals} 
                onProfessionalSelect={onProfessionalSelect}
                favoriteProfessionalIds={favoriteProfessionalIds}
                onToggleFavorite={onToggleFavorite}
                isUserLoggedIn={isUserLoggedIn}
              />
            ) : (
              <MapView 
                professionals={professionals} 
                onProfessionalSelect={onProfessionalSelect} 
              />
            )}
          </div>
        )}
      </div>
      
      {/* Componente de Filtros como menú lateral */}
      <Filters
        specialties={specialties}
        insurances={insurances}
        selectedSpecialties={selectedSpecialties}
        onSpecialtyChange={onSpecialtyChange}
        selectedInsurances={selectedInsurances}
        onInsuranceChange={onInsuranceChange}
        minRating={minRating}
        onRatingChange={onRatingChange}
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      />
    </>
  );
};