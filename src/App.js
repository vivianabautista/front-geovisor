// src/App.js
import React from 'react';
import './App.css';
import Map from './Map'; // Importa el componente Map

function App() {
  return (
    <div className="App">
      <h1>GeoHacker</h1>
      <Map /> {/* Muestra el mapa */}
    </div>
  );
}

export default App;
