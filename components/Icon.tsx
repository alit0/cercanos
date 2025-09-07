import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  className = 'w-6 h-6',
  size = 24,
  color = 'currentColor' 
}) => {
  // Función para convertir nombres de íconos a formato de Lucide
  const getLucideIconName = (iconName: string): string => {
    // Convierte nombres como 'map' a 'Map' o 'search-off' a 'SearchX'
    const nameMap: Record<string, string> = {
      'map': 'Map',
      'list': 'List',
      'user': 'User',
      'search': 'Search',
      'star': 'Star',
      'close': 'X',
      'phone': 'Phone',
      'directions': 'Navigation',
      'search-off': 'SearchX',
      'logo': 'Building',
      'location-pin': 'MapPin',
      'location': 'MapPin',
      'bookmark': 'Bookmark',
      'bookmark-solid': 'BookmarkFilled',
      'bookmark-plus': 'BookmarkPlus',
      'bookmark-minus': 'BookmarkMinus',
      'bookmark-check': 'BookmarkCheck',
      'save': 'Save',
      'heart': 'Heart',
      'heart-filled': 'HeartFilled',
      'briefcase': 'Briefcase',
      'settings': 'Settings',
      'logout': 'LogOut',
      'login': 'LogIn',
      'bell': 'Bell',
      'moon': 'Moon',
      'sun': 'Sun',
      'upload': 'Upload',
      'filter': 'Filter',
      'chevron-up': 'ChevronUp',
      'chevron-down': 'ChevronDown',
    };

    // Si el nombre existe en el mapeo, usarlo
    if (nameMap[iconName.toLowerCase()]) {
      return nameMap[iconName.toLowerCase()];
    }
    
    // Si el nombre ya comienza con mayúscula, usarlo directamente
    if (/^[A-Z]/.test(iconName)) {
      return iconName;
    }

    // Convertir el primer carácter a mayúscula
    return iconName.charAt(0).toUpperCase() + iconName.slice(1);
  };

  // Obtener el nombre de ícono de Lucide
  const lucideIconName = getLucideIconName(name) as keyof typeof LucideIcons;
  const LucideIcon = LucideIcons[lucideIconName];

  // Manejar íconos especiales para redes sociales
  if (name.toLowerCase() === 'google' || name.toLowerCase() === 'facebook') {
    // Para íconos que no están en Lucide, devolver un ícono genérico
    const SocialIcon = name.toLowerCase() === 'google' ? LucideIcons.Mail : LucideIcons.Facebook;
    return <SocialIcon className={className} size={size} color={color} />
  }

  // Si el ícono existe en Lucide, mostrarlo
  if (LucideIcon) {
    return <LucideIcon className={className} size={size} color={color} />
  }

  // Si el ícono no se encontró, mostrar un ícono de reemplazo
  return <LucideIcons.HelpCircle className={className} size={size} color={color} />
};