
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import { Location } from "@/data/locations";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet marker icons not showing
// This is necessary because of how Webpack/Vite handles assets
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapViewProps {
  location?: Location;
  allLocations?: Location[];
  className?: string;
}

// Component to handle flying to a location
const FlyToLocation = ({ location }: { location?: Location }) => {
  const map = useMap();
  
  useEffect(() => {
    // Add a small delay to ensure map is fully initialized
    const timer = setTimeout(() => {
      if (location) {
        map.flyTo(
          [location.coordinates[1], location.coordinates[0]], 
          10, 
          { duration: 2 }
        );
      } else {
        // Center on India if no location is selected
        map.setView([20.5937, 78.9629], 5);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location, map]);
  
  return null;
};

// Component for custom map controls
const MapControls = () => {
  const map = useMap();
  
  const handleZoomIn = () => {
    map.zoomIn();
  };
  
  const handleZoomOut = () => {
    map.zoomOut();
  };
  
  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 10 });
  };
  
  return (
    <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
      <Button 
        onClick={handleZoomIn} 
        size="icon" 
        variant="secondary" 
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
      >
        <ZoomIn className="h-5 w-5" />
      </Button>
      <Button 
        onClick={handleZoomOut} 
        size="icon" 
        variant="secondary"
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
      >
        <ZoomOut className="h-5 w-5" />
      </Button>
      <Button 
        onClick={handleLocate} 
        size="icon" 
        variant="secondary"
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
      >
        <Navigation className="h-5 w-5" />
      </Button>
    </div>
  );
};

// React event handler to stop propagation on map clicks
const EventHandler = () => {
  const map = useMap();
  
  useEffect(() => {
    // Prevent default behaviors that might cause issues
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      L.DomEvent.stopPropagation(e);
    };
    
    map.addEventListener('click', handleMapClick);
    
    return () => {
      map.removeEventListener('click', handleMapClick);
    };
  }, [map]);
  
  return null;
};

const MapView: React.FC<MapViewProps> = ({ 
  location, 
  allLocations = [], 
  className = ""
}) => {
  // If no specific locations are provided, use all of India as the center
  const defaultCenter: [number, number] = [20.5937, 78.9629]; // Center of India
  const initialCenter: [number, number] = location 
    ? [location.coordinates[1], location.coordinates[0]] 
    : defaultCenter;
  
  const zoom = location ? 6 : 5;
  
  const mapLocations = location ? [location] : allLocations;

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-xl border border-border ${className}`}>
      <MapContainer
        center={initialCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%", minHeight: "400px" }}
        className="z-10"
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mapLocations.map((loc) => (
          <Marker 
            key={loc.id} 
            position={[loc.coordinates[1], loc.coordinates[0]]}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-medium">{loc.name}</h3>
                <p className="text-xs text-muted-foreground">{loc.state}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <FlyToLocation location={location} />
        <MapControls />
        <EventHandler />
      </MapContainer>
    </div>
  );
};

export default MapView;
