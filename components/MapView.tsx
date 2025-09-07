import React, { useRef, useEffect } from 'react';
import type { Professional } from '../types';
import { Icon } from './Icon';

interface MapViewProps {
  professionals: Professional[];
  onProfessionalSelect: (professional: Professional) => void;
}

// Definición para Google Maps
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const MapView: React.FC<MapViewProps> = ({ professionals, onProfessionalSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Inicializar el mapa
    function initialize() {
      if (!window.google || !mapRef.current) return;
      
      try {
        // Configuración del mapa
        const mapOptions = {
          center: { lat: -34.603722, lng: -58.381592 }, // Buenos Aires
          zoom: 13,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          fullscreenControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          zoomControl: true,
          gestureHandling: 'cooperative'
        };
        
        // Crear el mapa
        const map = new window.google.maps.Map(mapRef.current, mapOptions);
        mapInstance.current = map;
        
        // Si hay profesionales, añadir marcadores
        if (professionals.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          
          professionals.forEach(prof => {
            // Crear marcador primero usando las coordenadas existentes como respaldo
            const marker = new window.google.maps.Marker({
              position: { lat: prof.location.lat, lng: prof.location.lng },
              map,
              title: prof.name,
              animation: window.google.maps.Animation.DROP
            });
            
            // Usar el servicio de Geocoding para ubicar la dirección exacta
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: prof.address + ", Mercedes, Buenos Aires, Argentina" }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                // Actualizar la posición del marcador con las coordenadas correctas
                const position = results[0].geometry.location;
                marker.setPosition(position);
                
                // Actualizar los límites del mapa
                bounds.extend(position);
                map.fitBounds(bounds);
                
                console.log(`Geocodificación exitosa para ${prof.name}: ${position}`);
              } else {
                console.warn(`No se pudo geocodificar la dirección de ${prof.name}: ${prof.address}. Usando coordenadas de respaldo.`);
              }
            });
            
            // Crear infoWindow con información del profesional
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 10px; max-width: 300px;">
                  <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${prof.name}</h3>
                  <p style="margin: 5px 0;">${prof.specialty}</p>
                  <p style="font-size: 13px; color: #666; margin: 5px 0;">${prof.address}</p>
                  <div style="display: flex; align-items: center; margin-top: 8px;">
                    <span style="color: #f59e0b; margin-right: 4px;">★</span>
                    <span>${prof.rating.toFixed(1)}</span>
                    <span style="margin-left: 4px; font-size: 12px; color: #666;">(${prof.reviewCount} opiniones)</span>
                  </div>
                  <button 
                    id="view-details-${prof.id}"
                    style="background-color: #0ea5e9; color: white; border: none; padding: 6px 12px; border-radius: 4px; margin-top: 10px; cursor: pointer; font-size: 14px;"
                  >
                    Ver detalles
                  </button>
                </div>
              `
            });
            
            // Añadir evento click al marcador
            marker.addListener('click', () => {
              // Cerrar ventanas abiertas
              markersRef.current.forEach(item => {
                if (item.infoWindow) item.infoWindow.close();
              });
              
              // Abrir esta ventana
              infoWindow.open(map, marker);
              
              // Añadir evento al botón después de que se abra el infoWindow
              window.google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                document.getElementById(`view-details-${prof.id}`)?.addEventListener('click', () => {
                  onProfessionalSelect(prof);
                });
              });
            });
            
            // Guardar referencia
            markersRef.current.push({ marker, infoWindow, professional: prof });
            
            // Extender los límites para incluir este marcador
            bounds.extend(marker.getPosition());
          });
          
          // Ajustar el mapa para mostrar todos los marcadores
          map.fitBounds(bounds);
          
          // Si solo hay un marcador, hacer zoom
          if (professionals.length === 1) {
            map.setZoom(15);
          }
        }
      } catch (error) {
        console.error('Error al inicializar el mapa:', error);
      }
    }
    
    // Verificar si Google Maps ya está disponible
    if (window.google && window.google.maps) {
      initialize();
    } else {
      // Esperar a que Google Maps se cargue
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps);
          initialize();
        }
      }, 100);
      
      // Limpiar intervalo si el componente se desmonta
      return () => clearInterval(checkGoogleMaps);
    }
  }, [professionals, onProfessionalSelect]);

  // Limpiar marcadores al desmontar
  useEffect(() => {
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(item => {
          if (item.marker) item.marker.setMap(null);
          if (item.infoWindow) item.infoWindow.close();
        });
        markersRef.current = [];
      }
    };
  }, []);
  

  // Renderizar el mapa
  return (
    <div 
      ref={mapRef} 
      className="w-full h-[600px] lg:h-[700px] rounded-b-xl overflow-hidden"
      style={{ position: 'relative' }}
    >
      {professionals.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 pointer-events-none">
          <div className="text-center p-4">
            <Icon name="map" className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No hay profesionales para mostrar en el mapa</p>
          </div>
        </div>
      )}
    </div>
  );
};