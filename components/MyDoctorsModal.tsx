import React from 'react';
import { Icon } from './Icon';
import { professionals as allProfessionals } from '../data/mockData';
import type { Professional } from '../types';
import { ProfessionalCard } from './ProfessionalCard';

interface MyDoctorsModalProps {
  onClose: () => void;
  onProfessionalSelect: (professional: Professional) => void;
  favoriteIds: string[];
  onToggleFavorite: (professionalId: string) => void;
  isUserLoggedIn: boolean;
}

export const MyDoctorsModal: React.FC<MyDoctorsModalProps> = ({ onClose, onProfessionalSelect, favoriteIds, onToggleFavorite, isUserLoggedIn }) => {
    const favoriteProfessionals = allProfessionals.filter(p => favoriteIds.includes(p.id));

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="p-6 border-b border-gray-200 relative">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full"
                        aria-label="Cerrar"
                    >
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Mis Médicos</h2>
                </header>

                <main className="p-2 sm:p-4 overflow-y-auto bg-gray-50/50">
                    {favoriteProfessionals.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                           {favoriteProfessionals.map(prof => (
                               <ProfessionalCard 
                                 key={prof.id} 
                                 professional={prof} 
                                 onSelect={() => onProfessionalSelect(prof)} 
                                 isFavorite={favoriteIds.includes(prof.id)}
                                 onToggleFavorite={onToggleFavorite}
                                 isUserLoggedIn={isUserLoggedIn}
                               />
                           ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 px-6">
                             <div className="text-gray-400 mx-auto h-16 w-16">
                                <Icon name="bookmark" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-700">No tienes médicos guardados</h3>
                            <p className="mt-1 text-gray-500">Explora la lista de profesionales y guarda tus favoritos para un acceso rápido.</p>
                        </div>
                    )}
                </main>
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