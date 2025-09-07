
import React from 'react';
import { Icon } from './Icon';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon name="Search" className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Buscar un profesional de salud..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out text-[14px] md:text-lg"
      />
    </div>
  );
};