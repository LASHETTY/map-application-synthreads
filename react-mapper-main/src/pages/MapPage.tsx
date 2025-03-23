
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { locations, Location } from "@/data/locations";
import MapView from "@/components/MapView";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, MapPin, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MapPage = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    const fetchLocation = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundLocation = locations.find(loc => loc.id === locationId);
      setLocation(foundLocation || null);
      setLoading(false);
    };
    
    fetchLocation();
  }, [locationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <Globe className="h-12 w-12 text-primary/40 mb-4 animate-spin" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center glass">
            <CardHeader>
              <CardTitle className="text-xl">Location Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <MapPin className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">
                Sorry, we couldn't find the location you're looking for.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 space-y-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">
                  {location.name}
                </h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{location.state}, India</span>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-48 object-cover transition-transform hover:scale-105 duration-700"
                />
              </div>
              
              <div>
                <Badge variant="secondary" className="mb-2">
                  {location.category}
                </Badge>
                <p className="text-muted-foreground">
                  {location.description}
                </p>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-1">Coordinates:</p>
                <code className="bg-muted p-2 rounded text-sm block">
                  {location.coordinates[1]}, {location.coordinates[0]}
                </code>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 h-[500px] mt-4 md:mt-0">
              <MapView location={location} className="h-full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapPage;
