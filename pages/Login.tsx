import React from 'react';
import { Icon } from '../components/Icon';
import { mockUser } from '../data/mockData';
import type { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, we log in the mock user regardless of input
    onLogin(mockUser);
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
          Bienvenido a Cercanos
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10">
          <div className="space-y-5">
            <button className="w-full inline-flex items-center justify-center px-4 py-3 border-0 text-sm font-medium rounded-lg shadow-md text-gray-700 bg-white hover:bg-gray-50 transition-all relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#4285F4] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="#fff">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <span className="ml-8">Continuar con Google</span>
            </button>
            <button className="w-full inline-flex items-center justify-center px-4 py-3 border-0 text-sm font-medium rounded-lg shadow-md text-white bg-[#1877F2] hover:bg-[#166FE5] transition-all">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continuar con Facebook
            </button>
          </div>

          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">o</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input 
                type="email" 
                id="email" 
                className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" 
                placeholder="tu@email.com" 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input 
                type="password" 
                id="password" 
                className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500" 
                placeholder="••••••••" 
              />
            </div>
            <div>
              <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-4 border-0 text-base font-semibold rounded-lg shadow-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all">
                Iniciar Sesión
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <button 
                onClick={() => navigate('/register/patient')} 
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Regístrate como Paciente
              </button>
              {' '}o{' '}
              <button 
                onClick={() => navigate('/register/professional')} 
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                como Profesional
              </button>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
