
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { locations } from "@/data/locations";
import { ArrowRight, MapPin } from "lucide-react";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70 z-10"></div>
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"></div>
          </div>
          
          <div className="container relative z-20 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center mb-10 scale-in">
              <Badge className="mb-4 px-3 py-1 text-sm inline-flex items-center">
                <span className="bg-primary rounded-full h-2 w-2 mr-2"></span>
                Discover India Like Never Before
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
                Explore the Beauty of <span className="text-primary">India</span> with MapVista
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                Interactive maps, beautiful locations, and intuitive navigation to guide your journey across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"} 
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Explore with Precision</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                MapVista offers a seamless exploration experience with cutting-edge features designed for travelers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Interactive Maps",
                  description: "Navigate through detailed maps with intuitive controls and smooth interactions.",
                  icon: <MapIcon className="h-10 w-10 text-primary" />
                },
                {
                  title: "Curated Locations",
                  description: "Discover handpicked destinations across India with rich details and insights.",
                  icon: <CompassIcon className="h-10 w-10 text-primary" />
                },
                {
                  title: "Personalized Experience",
                  description: "Save your favorite locations and create custom journeys tailored to your preferences.",
                  icon: <UserIcon className="h-10 w-10 text-primary" />
                }
              ].map((feature, index) => (
                <Card key={index} className="border-none bg-background shadow-md">
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Map Preview Section */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="w-full lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold">Immersive Map Experience</h2>
                <p className="text-muted-foreground">
                  Our interactive maps provide detailed views of India's most fascinating destinations. Zoom in to explore local landmarks or zoom out to plan your journey across regions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild>
                    <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                      Explore Maps
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="w-full lg:w-1/2 h-[400px] rounded-xl overflow-hidden shadow-xl">
                <MapView allLocations={locations} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Popular Destinations Section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover some of India's most cherished locations, from historic landmarks to natural wonders.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.slice(0, 3).map((location) => (
                <Card key={location.id} className="overflow-hidden group">
                  <div className="relative h-48">
                    <img 
                      src={location.image} 
                      alt={location.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{location.name}</h3>
                      <div className="flex items-center text-sm opacity-90">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {location.state}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {location.description}
                    </p>
                    <Link 
                      to={isAuthenticated ? `/map/${location.id}` : "/login"} 
                      className="text-primary text-sm font-medium flex items-center mt-4 hover:underline"
                    >
                      View on map <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline" asChild>
                <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                  View All Destinations
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t py-10 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <MapPin className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-semibold">MapVista</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MapVista. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Icons for feature section
const MapIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" x2="9" y1="3" y2="18"/>
    <line x1="15" x2="15" y1="6" y2="21"/>
  </svg>
);

const CompassIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

// Custom Badge component since we can't import it on Home page
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 ${className}`}>
    {children}
  </div>
);

export default Home;
