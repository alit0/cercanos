import React, { useState } from 'react';
import { Icon } from './Icon';
import { specialties, insurancePlans } from '../data/mockData';

interface ProfessionalRegistrationModalProps {
  onClose: () => void;
  onSwitchToPatient: () => void;
}

export const ProfessionalRegistrationModal: React.FC<ProfessionalRegistrationModalProps> = ({ onClose, onSwitchToPatient }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    console.log('Registering professional...');
    alert('¡Registro profesional enviado! (simulado). Su perfil será revisado.');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col animate-fade-in-up max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-gray-200 relative flex-shrink-0">
           <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full"
            aria-label="Cerrar"
          >
            <Icon name="X" className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 text-center">Registro para Profesionales</h2>
        </header>
        
        <form onSubmit={handleSubmit}>
            <main className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input type="text" required className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input type="tel" className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input type="email" required className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" required className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Especialidad Principal</label>
                    <select required className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 appearance-none">
                        <option>Selecciona tu especialidad</option>
                        {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Descripción (Acerca de)</label>
                    <textarea
                        id="bio"
                        rows={4}
                        className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        placeholder="Una breve biografía o descripción de tu práctica profesional que verán los pacientes..."
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                        <div className="space-y-1 text-center">
                            <Icon name="Upload" className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="photo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                                    <span>Sube tu foto</span>
                                    <input id="photo-upload" name="photo-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">o arrastra y suelta</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG o JPG hasta 5MB</p>
                        </div>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Obras Sociales / Prepagas Aceptadas</label>
                    <div className="mt-2 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 max-h-48 overflow-y-auto space-y-3">
                         {insurancePlans.map(plan => (
                            <label key={plan} className="flex items-center space-x-3 cursor-pointer">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                <span className="text-gray-700 text-sm">{plan}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </main>
        
            <footer className="p-6 bg-gray-50 rounded-b-2xl space-y-4 flex-shrink-0">
                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-4 border-0 text-base font-semibold rounded-lg shadow-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all">
                    Enviar Solicitud de Registro
                </button>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        ¿Eres un paciente?{' '}
                        <button type="button" onClick={onSwitchToPatient} className="font-medium text-teal-600 hover:text-teal-500">Regístrate aquí</button>.
                    </p>
                </div>
            </footer>
        </form>
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