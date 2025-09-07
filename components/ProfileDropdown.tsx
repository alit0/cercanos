import React from 'react';
import { Icon } from './Icon';
import type { User } from '../types';

interface ProfileDropdownProps {
  currentUser: User | null;
  onProfileClick: () => void;
  onMyDoctorsClick: () => void;
  onProfessionalPanelClick: () => void;
  onSettingsClick: () => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const DropdownItem: React.FC<{ icon: string; label: string; hasDivider?: boolean; onClick?: () => void }> = ({ icon, label, hasDivider, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors rounded-md text-left"
      >
        <Icon name={icon} className="w-5 h-5 mr-3 text-gray-400" />
        <span>{label}</span>
      </button>
      {hasDivider && <div className="my-1 h-px bg-gray-100" />}
    </li>
  );
};

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  currentUser,
  onProfileClick, 
  onMyDoctorsClick, 
  onProfessionalPanelClick, 
  onSettingsClick,
  onLoginClick,
  onLogoutClick
}) => {
  return (
    <div
      className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <ul className="space-y-1">
        {currentUser ? (
          <>
            <div className="px-4 py-2">
              <p className="text-sm font-semibold text-gray-800">Hola, {currentUser.name.split(' ')[0]}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
            </div>
            <div className="my-1 h-px bg-gray-100" />
            <DropdownItem icon="User" label="Mi Perfil" onClick={onProfileClick} />
            <DropdownItem icon="Bookmark" label="Mis Médicos" onClick={onMyDoctorsClick} />
            <DropdownItem icon="Briefcase" label="Panel Profesional" onClick={onProfessionalPanelClick} />
            <DropdownItem icon="Settings" label="Configuración" hasDivider onClick={onSettingsClick} />
            <DropdownItem icon="LogOut" label="Cerrar Sesión" onClick={onLogoutClick} />
          </>
        ) : (
          <DropdownItem icon="LogIn" label="Iniciar Sesión" onClick={onLoginClick} />
        )}
      </ul>
    </div>
  );
};
