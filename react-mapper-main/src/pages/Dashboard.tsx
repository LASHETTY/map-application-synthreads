
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import LocationCard from "@/components/LocationCard";
import { locations, categories } from "@/data/locations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  useEffect(() => {
    // Filter locations based on search term and category
    const filtered = locations.filter((location) => {
      const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory ? location.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredLocations(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Explore India
            </h1>
            <p className="text-muted-foreground mt-1">
              Discover amazing locations across the country
            </p>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9 w-full md:w-[260px]"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-1">No locations found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory(null);
            }}>
              Clear filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
