import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { insurancePlans } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export const RegisterPatientPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    console.log('Registering patient...');
    alert('¡Registro de paciente exitoso! (simulado)');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-teal-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
                  <button 
                    onClick={() => navigate('/')} 
                    className="absolute -top-9 right-4 text-gray-900 hover:text-gray-600 transition-colors p-2 rounded-full"
                    aria-label="Cerrar"
                  >
                    <Icon name="X" className="w-6 h-6" />
                  </button>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Crear Cuenta de Paciente
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <button 
            onClick={() => navigate('/login')} 
            className="font-medium text-white hover:text-white border border-white rounded-full px-4 py-2"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
              <input 
                type="text" 
                required 
                className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" 
              />
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
              <input 
                type="email" 
                required 
                className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input 
                type="password" 
                required 
                className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input 
                type="tel" 
                className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Obra Social / Prepaga</label>
              <select 
                className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 appearance-none"
              >
                <option>Selecciona una opción</option>
                {insurancePlans.map(plan => <option key={plan} value={plan}>{plan}</option>)}
              </select>
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full inline-flex items-center justify-center px-6 py-4 border-0 text-base font-semibold rounded-lg shadow-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
              >
                Registrarme
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Eres un profesional?{' '}
              <button 
                onClick={() => navigate('/register/professional')} 
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Regístrate aquí
              </button>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatientPage;
