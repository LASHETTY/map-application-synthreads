
import React from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">About MapVista</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern mapping platform designed to help you explore India's beauty with precision and elegance.
          </p>
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              MapVista was created with a simple mission: to make exploring India's diverse landscapes, rich cultural heritage, and iconic landmarks accessible to everyone. We believe in the power of maps not just as navigational tools, but as gateways to discovery and understanding.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Interactive Maps",
                  description: "Explore detailed maps with intuitive controls and smooth navigation."
                },
                {
                  title: "Curated Locations",
                  description: "Discover handpicked destinations with rich information and stunning visuals."
                },
                {
                  title: "User Authentication",
                  description: "Secure login system to save your preferences and favorite locations."
                },
                {
                  title: "Responsive Design",
                  description: "Enjoy a seamless experience across desktop, tablet, and mobile devices."
                }
              ].map((feature, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Technology</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              MapVista is built with modern web technologies to provide a fast, reliable, and beautiful user experience:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><span className="font-medium text-foreground">React</span> - For building a dynamic and responsive user interface</li>
              <li><span className="font-medium text-foreground">Leaflet</span> - Open-source JavaScript library for interactive maps</li>
              <li><span className="font-medium text-foreground">Tailwind CSS</span> - For elegant, customized styling</li>
              <li><span className="font-medium text-foreground">TypeScript</span> - For type-safe code and better developer experience</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Privacy & Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              At MapVista, we respect your privacy. We only collect essential information needed to provide our services and continuously improve your experience. We don't sell your data to third parties, and we implement industry-standard security measures to protect your information.
            </p>
          </section>
        </div>
      </main>
      
      <footer className="bg-background border-t py-8 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MapVista. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
