import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { mockUser } from './data/mockData';

// Importaciones dinámicas con React.lazy
const App = lazy(() => import('./App'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPatientPage = lazy(() => import('./pages/RegisterPatient'));
const RegisterProfessionalPage = lazy(() => import('./pages/RegisterProfessional'));

// Componente de carga
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Cargando...</p>
    </div>
  </div>
);

// Crear las rutas de la aplicación y manejar autenticación en la raíz
const Root = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  
  const handleLogin = (user) => {
    setCurrentUser(user);
    // Almacenar en localStorage para persistencia entre páginas
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  // Crear rutas con el contexto de autenticación
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Suspense fallback={<LoadingFallback />}><App currentUser={currentUser} /></Suspense>
    },
    {
      path: '/login',
      element: <Suspense fallback={<LoadingFallback />}><LoginPage onLogin={handleLogin} /></Suspense>
    },
    {
      path: '/register/patient',
      element: <Suspense fallback={<LoadingFallback />}><RegisterPatientPage /></Suspense>
    },
    {
      path: '/register/professional',
      element: <Suspense fallback={<LoadingFallback />}><RegisterProfessionalPage /></Suspense>
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Root;
