import React, { useState } from 'react';
import { Icon } from './Icon';

interface SettingsModalProps {
  onClose: () => void;
  onSave: (settings: any) => void;
}

const Toggle: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ label, enabled, onChange }) => (
    <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg border border-gray-200">
        <span className="text-gray-700">{label}</span>
        <div className="relative">
            <input type="checkbox" className="sr-only" checked={enabled} onChange={(e) => onChange(e.target.checked)} />
            <div className={`block w-12 h-6 rounded-full transition ${enabled ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${enabled ? 'translate-x-6' : ''}`}></div>
        </div>
    </label>
);

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onSave }) => {
  const [notifications, setNotifications] = useState({ email: true, push: false });
  const [theme, setTheme] = useState('system');

  const themes = [
    { value: 'light', label: 'Claro', iconName: 'Sun' },
    { value: 'dark', label: 'Oscuro', iconName: 'Moon' },
    { value: 'system', label: 'Sistema', iconName: 'Settings' },
  ];

  const handleSave = () => {
    onSave({ notifications, theme });
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-gray-200 relative bg-white rounded-t-2xl">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full"
            aria-label="Cerrar"
          >
            <Icon name="X" className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 text-center">Configuración</h2>
        </header>

        <main className="p-6 overflow-y-auto space-y-8">
          {/* Notifications Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Icon name="Bell" className="w-5 h-5 mr-3 text-teal-500" />
              Notificaciones
            </h3>
            <div className="space-y-3">
              <Toggle 
                label="Notificaciones por Correo" 
                enabled={notifications.email} 
                onChange={(val) => setNotifications(prev => ({...prev, email: val}))}
              />
              <Toggle 
                label="Notificaciones Push" 
                enabled={notifications.push} 
                onChange={(val) => setNotifications(prev => ({...prev, push: val}))}
              />
            </div>
          </div>

          {/* Theme Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Icon name="Settings" className="w-5 h-5 mr-3 text-teal-500" />
              Tema de la Aplicación
            </h3>
            <div className="grid grid-cols-3 gap-3">
                {
                    themes.map(({ value, label, iconName }) => (
                        <button 
                            key={value}
                            onClick={() => setTheme(value)}
                            className={`p-4 flex flex-col items-center justify-center space-y-2 rounded-lg border-2 transition ${theme === value ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                        >
                            <Icon name={iconName} className={`w-6 h-6 ${theme === value ? 'text-teal-600' : 'text-gray-500'}`} />
                            <span className={`font-medium text-sm ${theme === value ? 'text-teal-700' : 'text-gray-600'}`}>{label}</span>
                        </button>
                    ))
                }
            </div>
          </div>
        </main>

        <footer className="p-6 border-t border-gray-200 mt-auto bg-white rounded-b-2xl flex justify-end space-x-3">
           <button
             onClick={onClose}
             className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
           >
             Cancelar
           </button>
           <button
             onClick={handleSave}
             className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
           >
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