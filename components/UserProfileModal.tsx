import React from 'react';
import { Icon } from './Icon';
import type { User } from '../types';

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
}

const InfoRow: React.FC<{ icon: string; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="flex items-start py-3">
        <Icon name={icon} className="w-5 h-5 text-teal-500 mt-1 mr-4 flex-shrink-0" />
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-gray-800 font-medium">{value}</p>
        </div>
    </div>
);

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-fade-in-up"
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
          <div className="flex flex-col items-center text-center">
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">Paciente</p>
          </div>
        </header>

        <main className="p-6 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Información de Contacto</h3>
          <div className="divide-y divide-gray-200">
              <InfoRow icon="Mail" label="Correo Electrónico" value={user.email} />
              <InfoRow icon="Phone" label="Teléfono" value={user.phone} />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Cobertura Médica</h3>
          <div className="divide-y divide-gray-200">
            <InfoRow icon="Briefcase" label="Obra Social / Prepaga" value={user.insurance} />
          </div>
        </main>

        <footer className="p-6 border-t border-gray-200 mt-auto bg-gray-50 rounded-b-2xl">
           <button
             className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
           >
             Editar Perfil
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