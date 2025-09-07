import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { ResultsView } from './components/ResultsView';
import { SearchBar } from './components/SearchBar';
import { professionals as mockProfessionals, specialties, insurancePlans, mockUser } from './data/mockData';
import type { Professional, User, Review } from './types';
import { useNavigate } from 'react-router-dom';

// Importaciones dinámicas para componentes pesados
const ProfessionalDetailModal = lazy(() => import('./components/ProfessionalDetailModal').then(module => ({ default: module.ProfessionalDetailModal })));
const UserProfileModal = lazy(() => import('./components/UserProfileModal').then(module => ({ default: module.UserProfileModal })));
const MyDoctorsModal = lazy(() => import('./components/MyDoctorsModal').then(module => ({ default: module.MyDoctorsModal })));
const ProfessionalPanelModal = lazy(() => import('./components/ProfessionalPanelModal').then(module => ({ default: module.ProfessionalPanelModal })));
const SettingsModal = lazy(() => import('./components/SettingsModal').then(module => ({ default: module.SettingsModal })));

// Componente de carga para Suspense
const ModalLoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-3 text-center text-gray-600">Cargando...</p>
    </div>
  </div>
);

interface AppProps {
  currentUser: User | null;
}

const App: React.FC<AppProps> = ({ currentUser }) => {
  const [professionals, setProfessionals] = useState<Professional[]>(mockProfessionals);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>(professionals);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isMyDoctorsModalOpen, setIsMyDoctorsModalOpen] = useState(false);
  const [isProfessionalPanelOpen, setIsProfessionalPanelOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  // Estados para modales de login/registro eliminados ya que ahora usamos páginas
  const [favoriteProfessionalIds, setFavoriteProfessionalIds] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteProfessionals');
    if (storedFavorites) {
      setFavoriteProfessionalIds(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteProfessionals', JSON.stringify(favoriteProfessionalIds));
  }, [favoriteProfessionalIds]);

  const toggleFavorite = (professionalId: string) => {
    setFavoriteProfessionalIds(prevFavorites => {
      if (prevFavorites.includes(professionalId)) {
        return prevFavorites.filter(id => id !== professionalId);
      } else {
        return [...prevFavorites, professionalId];
      }
    });
  };


  const availableSpecialties = useMemo(() => specialties, []);
  const availableInsurances = useMemo(() => insurancePlans, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    const filtered = professionals.filter(prof => {
      const nameMatch = prof.name.toLowerCase().includes(lowerCaseQuery);
      const specialtyMatchQuery = prof.specialty.toLowerCase().includes(lowerCaseQuery);
      
      const specialtyFilterMatch = selectedSpecialties.length === 0 || selectedSpecialties.includes(prof.specialty);
      const insuranceFilterMatch = selectedInsurances.length === 0 || prof.insurances.some(ins => selectedInsurances.includes(ins));
      const ratingFilterMatch = prof.rating >= minRating;

      return (nameMatch || specialtyMatchQuery) && specialtyFilterMatch && insuranceFilterMatch && ratingFilterMatch;
    });

    setFilteredProfessionals(filtered);
  }, [searchQuery, selectedSpecialties, selectedInsurances, minRating, professionals]);

  const handleRatingChange = (rating: number) => {
    setMinRating(currentMinRating => (currentMinRating === rating ? 0 : rating));
  };

  const handleProfessionalSelect = (professional: Professional) => {
    setSelectedProfessional(professional);
  };

  const handleCloseModal = () => {
    setSelectedProfessional(null);
  }

  const handleOpenUserProfile = () => {
    setIsUserProfileOpen(true);
  };

  const handleCloseUserProfile = () => {
    setIsUserProfileOpen(false);
  };

  const handleOpenMyDoctors = () => {
    setIsMyDoctorsModalOpen(true);
  };

  const handleCloseMyDoctors = () => {
    setIsMyDoctorsModalOpen(false);
  };

  const handleSelectFromMyDoctors = (professional: Professional) => {
    handleCloseMyDoctors();
    handleProfessionalSelect(professional);
  };

  const handleOpenProfessionalPanel = () => {
    setIsProfessionalPanelOpen(true);
  };

  const handleCloseProfessionalPanel = () => {
    setIsProfessionalPanelOpen(false);
  };

  const handleSaveChangesForProfessional = (professionalId: string, newInsurances: string[]) => {
    setProfessionals(prevProfessionals =>
      prevProfessionals.map(prof =>
        prof.id === professionalId
          ? { ...prof, insurances: newInsurances }
          : prof
      )
    );
    console.log("Guardando cambios para el profesional con ID:", professionalId);
    console.log("Nueva lista de obras sociales:", newInsurances);
    alert("Cambios guardados exitosamente. La información del profesional ha sido actualizada.");
  };

  const handleOpenSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  const handleSaveSettings = (settings: any) => {
    console.log("Guardando configuración:", settings);
    alert("Configuración guardada exitosamente.");
    handleCloseSettingsModal();
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleOpenLoginModal = () => {
    navigate('/login');
  };

  // Los manejadores de modales ya no son necesarios ya que ahora usamos navegación entre páginas

  const handleAddReview = (professionalId: string, reviewData: { rating: number; comment: string }) => {
    if (!user) return;

    setProfessionals(prevProfessionals => {
      const newProfessionals = prevProfessionals.map(prof => {
        if (prof.id === professionalId) {
          const newReview: Review = {
            id: `r${prof.id}-${Date.now()}`,
            author: user.name,
            avatarUrl: user.avatarUrl,
            rating: reviewData.rating,
            comment: reviewData.comment,
            date: 'ahora mismo',
          };
          
          const updatedReviews = [newReview, ...prof.reviews];
          const newTotalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAverageRating = newTotalRating / updatedReviews.length;

          return {
            ...prof,
            reviews: updatedReviews,
            reviewCount: prof.reviewCount + 1,
            rating: newAverageRating,
          };
        }
        return prof;
      });

      // Also update the selected professional if it's being viewed
      if (selectedProfessional && selectedProfessional.id === professionalId) {
        setSelectedProfessional(newProfessionals.find(p => p.id === professionalId) || null);
      }
      
      return newProfessionals;
    });
  };

  return (
    <div className="bg-teal-600 min-h-screen">
      <Header 
        currentUser={currentUser}
        onProfileClick={handleOpenUserProfile} 
        onMyDoctorsClick={handleOpenMyDoctors}
        onProfessionalPanelClick={handleOpenProfessionalPanel}
        onSettingsClick={handleOpenSettingsModal}
        onLoginClick={handleOpenLoginModal}
        onLogoutClick={handleLogout}
      />
      <main className="container mx-auto p-4 lg:p-6">
        <div className="mb-6  p-4 rounded-xl shadow-sm ">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="w-full">
              <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
            </div>
          </div>
        </div>
        
        
        <ResultsView
          professionals={filteredProfessionals}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onProfessionalSelect={handleProfessionalSelect}
          favoriteProfessionalIds={favoriteProfessionalIds}
          onToggleFavorite={toggleFavorite}
          isUserLoggedIn={!!user}
          specialties={availableSpecialties}
          insurances={availableInsurances}
          selectedSpecialties={selectedSpecialties}
          onSpecialtyChange={setSelectedSpecialties}
          selectedInsurances={selectedInsurances}
          onInsuranceChange={setSelectedInsurances}
          minRating={minRating}
          onRatingChange={handleRatingChange}
        />
      </main>

      {selectedProfessional && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <ProfessionalDetailModal 
            professional={selectedProfessional} 
            onClose={handleCloseModal}
            currentUser={user}
            onAddReview={handleAddReview}
          />
        </Suspense>
      )}
      
      {isUserProfileOpen && user && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <UserProfileModal user={user} onClose={handleCloseUserProfile} />
        </Suspense>
      )}

      {isMyDoctorsModalOpen && user && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <MyDoctorsModal 
            onClose={handleCloseMyDoctors}
            onProfessionalSelect={handleSelectFromMyDoctors}
            favoriteIds={favoriteProfessionalIds}
            onToggleFavorite={toggleFavorite}
            isUserLoggedIn={!!currentUser}
          />
        </Suspense>
      )}

      {isProfessionalPanelOpen && user && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <ProfessionalPanelModal 
            onClose={handleCloseProfessionalPanel}
            onSaveChanges={handleSaveChangesForProfessional}
          />
        </Suspense>
      )}

      {isSettingsModalOpen && user && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <SettingsModal 
              onClose={handleCloseSettingsModal}
              onSave={handleSaveSettings}
          />
        </Suspense>
      )}

      {/* Los modales de login/registro han sido reemplazados por páginas */}
    </div>
  );
};

export default App;