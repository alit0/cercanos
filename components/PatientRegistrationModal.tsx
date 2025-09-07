import React, { useState } from 'react';
import { Icon } from './Icon';
import { insurancePlans } from '../data/mockData';

interface PatientRegistrationModalProps {
  onClose: () => void;
  onSwitchToProfessional: () => void;
}

export const PatientRegistrationModal: React.FC<PatientRegistrationModalProps> = ({ onClose, onSwitchToProfessional }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    console.log('Registering patient...');
    alert('¡Registro de paciente exitoso! (simulado)');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col animate-fade-in-up max-h-[90vh]"
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
          <h2 className="text-2xl font-bold text-gray-800 text-center">Crear Cuenta de Paciente</h2>
        </header>
        
        <form onSubmit={handleSubmit}>
            <main className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input type="text" required className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Foto de Perfil (Opcional)</label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                        <div className="space-y-1 text-center">
                            <Icon name="Upload" className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="patient-photo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                                    <span>Sube tu foto</span>
                                    <input id="patient-photo-upload" name="patient-photo-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">o arrastra y suelta</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG o JPG hasta 5MB</p>
                        </div>
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
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input type="tel" className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Obra Social / Prepaga</label>
                    <select className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 appearance-none">
                        <option>Selecciona una opción</option>
                        {insurancePlans.map(plan => <option key={plan} value={plan}>{plan}</option>)}
                    </select>
                </div>
            </main>
        
            <footer className="p-6 bg-gray-50 rounded-b-2xl space-y-4 flex-shrink-0">
                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-4 border-0 text-base font-semibold rounded-lg shadow-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all">
                    Registrarme
                </button>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        ¿Eres un profesional?{' '}
                        <button type="button" onClick={onSwitchToProfessional} className="font-medium text-teal-600 hover:text-teal-500">Regístrate aquí</button>.
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