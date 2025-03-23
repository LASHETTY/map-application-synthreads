
export interface Location {
  id: string;
  name: string;
  state: string;
  description: string;
  image: string;
  coordinates: [number, number]; // [longitude, latitude]
  category: string;
}

export const locations: Location[] = [
  {
    id: "loc-1",
    name: "Mumbai",
    state: "Maharashtra",
    description: "The financial capital of India with a vibrant culture and coastline.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop",
    coordinates: [72.8777, 19.0760],
    category: "Metro"
  },
  {
    id: "loc-2",
    name: "Delhi",
    state: "Delhi",
    description: "The national capital with rich history and modern infrastructure.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
    coordinates: [77.1025, 28.7041],
    category: "Metro"
  },
  {
    id: "loc-3",
    name: "Bengaluru",
    state: "Karnataka",
    description: "India's tech hub known for its pleasant climate and gardens.",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop",
    coordinates: [77.5946, 12.9716],
    category: "Metro"
  },
  {
    id: "loc-4",
    name: "Jaipur",
    state: "Rajasthan",
    description: "The Pink City famous for its stunning architecture and rich culture.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897d36a7d?q=80&w=1000&auto=format&fit=crop",
    coordinates: [75.7873, 26.9124],
    category: "Historical"
  },
  {
    id: "loc-5",
    name: "Darjeeling",
    state: "West Bengal",
    description: "Hill station known for its tea plantations and views of Kanchenjunga.",
    image: "https://images.unsplash.com/photo-1544686635-1dbd4ace9efb?q=80&w=1000&auto=format&fit=crop",
    coordinates: [88.2636, 27.0410],
    category: "Hill Station"
  },
  {
    id: "loc-6",
    name: "Goa",
    state: "Goa",
    description: "Popular beach destination known for its coastline and Portuguese influence.",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=1000&auto=format&fit=crop",
    coordinates: [74.1240, 15.2993],
    category: "Beach"
  },
  {
    id: "loc-7",
    name: "Agra",
    state: "Uttar Pradesh",
    description: "Home to the Taj Mahal and other historic Mughal architecture.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop",
    coordinates: [78.0081, 27.1767],
    category: "Historical"
  },
  {
    id: "loc-8",
    name: "Varanasi",
    state: "Uttar Pradesh",
    description: "One of the oldest continuously inhabited cities in the world.",
    image: "https://images.unsplash.com/photo-1561361058-c12e04033351?q=80&w=1000&auto=format&fit=crop",
    coordinates: [83.0068, 25.3176],
    category: "Spiritual"
  }
];

export const categories = [...new Set(locations.map(loc => loc.category))];
