
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Location } from "@/data/locations";

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 border hover:border-primary/50 hover:shadow-lg">
        <div className="relative h-48 overflow-hidden">
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <Badge variant="secondary" className="absolute top-3 right-3 backdrop-blur-md">
            {location.category}
          </Badge>
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{location.name}</CardTitle>
              <CardDescription className="flex items-center text-sm mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {location.state}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{location.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full" variant="outline">
            <Link to={`/map/${location.id}`}>
              View on Map
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LocationCard;
