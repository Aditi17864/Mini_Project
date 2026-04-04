import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './IndiaMap.css';

// Leaflet CSS is required for proper map rendering
import 'leaflet/dist/leaflet.css';

// India center coordinates
const INDIA_CENTER = [20.5937, 78.9629];
const ZOOM_LEVEL = 4;

// Sample heatmap data with disease risk points across India
const HEATMAP_DATA = [
  // High Risk (Red) - Critical areas
  { id: 1, lat: 28.6139, lng: 77.2090, location: 'Delhi', risk: 'high', disease: 'Cholera', cases: 47 },
  { id: 2, lat: 25.3176, lng: 82.9739, location: 'Varanasi', risk: 'high', disease: 'Typhoid', cases: 32 },
  { id: 3, lat: 22.5726, lng: 88.3639, location: 'Kolkata', risk: 'high', disease: 'E. coli', cases: 28 },
  { id: 4, lat: 19.0760, lng: 72.8777, location: 'Mumbai', risk: 'high', disease: 'Hepatitis A', cases: 21 },
  { id: 5, lat: 23.1815, lng: 79.9864, location: 'Indore', risk: 'high', disease: 'Contamination', cases: 18 },

  // Moderate Risk (Yellow) - Watch zones
  { id: 6, lat: 23.0225, lng: 72.5714, location: 'Ahmedabad', risk: 'moderate', disease: 'Leptospirosis', cases: 14 },
  { id: 7, lat: 21.1458, lng: 79.0882, location: 'Nagpur', risk: 'moderate', disease: 'pH Imbalance', cases: 11 },
  { id: 8, lat: 13.0827, lng: 80.2707, location: 'Chennai', risk: 'moderate', disease: 'Turbidity', cases: 9 },
  { id: 9, lat: 18.5204, lng: 73.8567, location: 'Pune', risk: 'moderate', disease: 'Bacterial', cases: 8 },
  { id: 10, lat: 15.2993, lng: 74.8440, location: 'Goa', risk: 'moderate', disease: 'Salmonella', cases: 6 },

  // Safe (Green) - Clean water zones
  { id: 11, lat: 11.0081, lng: 76.9969, location: 'Coimbatore', risk: 'safe', disease: 'All Normal', cases: 0 },
  { id: 12, lat: 10.9160, lng: 76.5437, location: 'Kochi', risk: 'safe', disease: 'All Normal', cases: 0 },
  { id: 13, lat: 13.0827, lng: 80.2707, location: 'Trichy', risk: 'safe', disease: 'All Normal', cases: 0 },
  { id: 14, lat: 12.2958, lng: 76.6394, location: 'Bangalore', risk: 'safe', disease: 'All Normal', cases: 0 },
  { id: 15, lat: 17.3850, lng: 78.4867, location: 'Hyderabad', risk: 'safe', disease: 'All Normal', cases: 0 },
];

// Risk colors
const RISK_COLORS = {
  high: '#ef4444',
  moderate: '#f59e0b',
  safe: '#22c55e'
};

const RISK_LABELS = {
  high: 'High Risk',
  moderate: 'Moderate',
  safe: 'Safe'
};

function IndiaMap({ showLegend = true }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Custom marker icons
  const createMarkerIcon = (risk) => {
    return L.divIcon({
      html: `<div class="custom-marker" style="background-color: ${RISK_COLORS[risk]}; border-color: ${RISK_COLORS[risk]}">
        <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      </div>`,
      className: 'marker-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  return (
    <div className="india-map-container">
      {/* Map */}
      <div className="map-wrapper">
        <MapContainer 
          center={INDIA_CENTER} 
          zoom={ZOOM_LEVEL} 
          style={{ height: '100%', width: '100%' }}
          className="leaflet-container-custom"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          
          {/* Heat Points */}
          <LayerGroup>
            {HEATMAP_DATA.map((point) => (
              <CircleMarker
                key={point.id}
                center={[point.lat, point.lng]}
                radius={point.risk === 'high' ? 8 : point.risk === 'moderate' ? 6 : 5}
                pathOptions={{
                  fillColor: RISK_COLORS[point.risk],
                  color: RISK_COLORS[point.risk],
                  weight: 2,
                  opacity: 1,
                  fillOpacity: 0.8,
                }}
                eventHandlers={{
                  click: () => setSelectedMarker(point)
                }}
              >
                <Popup>
                  <div className="popup-content">
                    <h4>{point.location}</h4>
                    <p><strong>Disease:</strong> {point.disease}</p>
                    <p><strong>Cases:</strong> {point.cases}</p>
                    <p><strong>Risk Level:</strong> <span style={{ color: RISK_COLORS[point.risk], fontWeight: 'bold' }}>{RISK_LABELS[point.risk]}</span></p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </LayerGroup>
        </MapContainer>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="map-legend">
          <h4 className="legend-title">Risk Level Legend</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: RISK_COLORS.high }}
              />
              <span>High Risk - Critical</span>
            </div>
            <div className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: RISK_COLORS.moderate }}
              />
              <span>Moderate - Watch Zone</span>
            </div>
            <div className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: RISK_COLORS.safe }}
              />
              <span>Safe - All Parameters Normal</span>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      {selectedMarker && (
        <div className="marker-info">
          <button className="close-btn" onClick={() => setSelectedMarker(null)}>✕</button>
          <h3>{selectedMarker.location}</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Disease</span>
              <span className="info-value">{selectedMarker.disease}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Cases</span>
              <span className="info-value">{selectedMarker.cases}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Risk Level</span>
              <span 
                className="info-value" 
                style={{ color: RISK_COLORS[selectedMarker.risk], fontWeight: 'bold' }}
              >
                {RISK_LABELS[selectedMarker.risk]}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndiaMap;
