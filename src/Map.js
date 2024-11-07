// src/Map.js
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

// Configuración de Mapbox (reemplaza 'YOUR_MAPBOX_ACCESS_TOKEN' con tu token de acceso)
mapboxgl.accessToken = 'key'; // Reemplaza con tu clave de Mapbox

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    // Limpiar el mapa cuando el componente se desmonte
    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '500px', // Ajusta el tamaño del mapa según sea necesario
      }}
    />
  );
};

export default Map;
