import React from 'react';
import { Map } from './styles';

interface LatLng{
    lat: number;
    lng: number;
}

interface Marker {
  lat: number;
  lng: number;
  color: string;
  label?: string;
}

interface StaticMapProps {
  origin: Marker;
  destination: Marker;
  midpoint: LatLng;
  apiKey: string;
}

const StaticMap: React.FC<StaticMapProps> = ({ origin, destination, midpoint, apiKey }) => {
  if (!apiKey) {
    throw new Error('Google Maps API Key is required.');
  }

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${midpoint.lat},${midpoint.lng}&zoom=12&size=430x445&scale=2&markers=color:${origin.color}|label:${origin.label || 'O'}|${origin.lat},${origin.lng}&markers=color:${destination.color}|label:${destination.label || 'D'}|${destination.lat},${destination.lng}&key=${apiKey}`;

  return (
    <Map src={mapUrl} alt="Mapa estático" />
  );
};

export default StaticMap;