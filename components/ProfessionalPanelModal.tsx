import React, { useState } from 'react';
import { Icon } from './Icon';
import { professionals, insurancePlans } from '../data/mockData';
import type { Professional } from '../types';
import { ReviewCard } from './ReviewCard';

interface ProfessionalPanelModalProps {
  onClose: () => void;
  onSaveChanges: (professionalId: string, updatedInsurances: string[]) => void;
}

// For demo purposes, we'll assume a specific professional is logged in.
const LOGGED_IN_PROFESSIONAL_ID = '1';

export const ProfessionalPanelModal: React.FC<ProfessionalPanelModalProps> = ({ onClose, onSaveChanges }) => {
  const professionalProfile = professionals.find(p => p.id === LOGGED_IN_PROFESSIONAL_ID);
  
  // State to manage the list of accepted insurances
  const [acceptedInsurances, setAcceptedInsurances] = useState<string[]>(professionalProfile?.insurances || []);

  if (!professionalProfile) {
    // Handle case where profile is not found, although it shouldn't happen with mock data.
    return null; 
  }

  const handleInsuranceChange = (insuranceName: string) => {
    setAcceptedInsurances(current => 
      current.includes(insuranceName)
        ? current.filter(name => name !== insuranceName)
        : [...current, insuranceName]
    );
  };
  
  const handleSaveChanges = () => {
    // Call the parent handler to update the app's state
    onSaveChanges(professionalProfile.id, acceptedInsurances);
    onClose(); // Close the modal after saving
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-gray-200 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full"
            aria-label="Cerrar"
          >
            <Icon name="X" className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4">
            <img 
              src={professionalProfile.photoUrl} 
              alt={professionalProfile.name} 
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Panel Profesional</h2>
                <p className="text-gray-600">Gestiona tu perfil público, Dr. {professionalProfile.name.split(' ').pop()}</p>
            </div>
          </div>
        </header>

        <main className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Insurance Management */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Gestionar Obras Sociales</h3>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2 bg-gray-50 p-3 rounded-md border">
                    {insurancePlans.map(plan => (
                        <label key={plan} className="flex items-center space-x-3 cursor-pointer p-1 rounded hover:bg-gray-100">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            checked={acceptedInsurances.includes(plan)}
                            onChange={() => handleInsuranceChange(plan)}
                        />
                        <span className="text-gray-700">{plan}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Right Column: Reviews */}
            <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Mis Reseñas ({professionalProfile.reviews.length})</h3>
                 <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {professionalProfile.reviews.length > 0 ? (
                        professionalProfile.reviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))
                    ) : (
                        <p className="text-gray-500 italic">Aún no has recibido ninguna reseña.</p>
                    )}
                 </div>
            </div>

        </main>

        <footer className="p-6 border-t border-gray-200 mt-auto bg-gray-50 rounded-b-2xl flex justify-end">
           <button
             onClick={handleSaveChanges}
             className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
           >
             <Icon name="Settings" className="w-5 h-5 mr-2" />
             Guardar Cambios
           </button>
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