import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { Icon } from './Icon';

interface FiltersProps {
  specialties: string[];
  insurances: string[];
  selectedSpecialties: string[];
  onSpecialtyChange: React.Dispatch<React.SetStateAction<string[]>>;
  selectedInsurances: string[];
  onInsuranceChange: React.Dispatch<React.SetStateAction<string[]>>;
  minRating: number;
  onRatingChange: (rating: number) => void;
}

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} className="text-gray-500 w-5 h-5"/>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

interface SidebarFiltersProps extends FiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Filters: React.FC<FiltersProps & {isOpen?: boolean; onClose?: () => void;}> = ({
  specialties,
  insurances,
  selectedSpecialties,
  onSpecialtyChange,
  selectedInsurances,
  onInsuranceChange,
  minRating,
  onRatingChange,
  isOpen = false,
  onClose = () => {},
}) => {
  // Comprobamos si el componente está siendo controlado externamente
  const isControlled = true;
  const handleCheckboxChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((currentSelected) => {
      if (currentSelected.includes(value)) {
        return currentSelected.filter((item) => item !== value);
      } else {
        return [...currentSelected, value];
      }
    });
  };

  // Calcular el número de filtros activos
  const activeFiltersCount = selectedSpecialties.length + 
    selectedInsurances.length + 
    (minRating > 0 ? 1 : 0);

  return (
    <>
      {/* Overlay que solo aparece cuando el menú lateral está abierto */}
      {isControlled && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={onClose}
        />
      )}

      {/* Menú lateral de filtros */}
      <div 
        className={`fixed top-0 bottom-0 right-0 w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto ${isControlled && isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Filtros</h2>
            <button 
              onClick={onClose} 
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              aria-label="Cerrar"
            >
              <Icon name="X" className="w-5 h-5" />
            </button>
          </div>

          {activeFiltersCount > 0 && (
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {activeFiltersCount} {activeFiltersCount === 1 ? 'filtro aplicado' : 'filtros aplicados'}
              </span>
              <button
                onClick={() => {
                  onSpecialtyChange([]);
                  onInsuranceChange([]);
                  onRatingChange(0);
                }}
                className="text-sm text-teal-600 hover:text-teal-800"
              >
                Limpiar filtros
              </button>
            </div>
          )}
          <FilterSection title="Especialidad">
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {specialties.map(specialty => (
                <label key={specialty} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    checked={selectedSpecialties.includes(specialty)}
                    onChange={() => handleCheckboxChange(specialty, onSpecialtyChange)}
                  />
                  <span className="text-gray-700">{specialty}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Obra Social / Prepaga">
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {insurances.map(insurance => (
                <label key={insurance} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    checked={selectedInsurances.includes(insurance)}
                    onChange={() => handleCheckboxChange(insurance, onInsuranceChange)}
                  />
                  <span className="text-gray-700">{insurance}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Valoración">
            <div className="flex flex-col space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => onRatingChange(rating)}
                  className={`flex items-center space-x-2 p-2 rounded-md transition ${minRating === rating ? 'bg-teal-100' : 'hover:bg-gray-100'}`}
                >
                  <StarRating rating={rating} />
                </button>
              ))}
            </div>
          </FilterSection>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 font-medium"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </>
  );
};