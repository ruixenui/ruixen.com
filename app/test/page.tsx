"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Star, 
  Zap, 
  Shield, 
  Sparkles, 
  Rocket, 
  Globe,
  CheckCircle,
  TrendingUp
} from "lucide-react";

interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  image?: string;
  colSpan?: string;
  rowSpan?: string;
  featured?: boolean;
}

const bentoItems: BentoItem[] = [
  {
    title: "AI-Powered Analytics",
    description: "Get real-time insights with our advanced machine learning algorithms that adapt to your business needs.",
    icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
    status: "Live",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    featured: true
  },
  {
    title: "Lightning Fast",
    description: "Optimized performance with sub-second response times across all features.",
    icon: <Zap className="w-5 h-5 text-yellow-500" />,
    status: "Active",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1"
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption and compliance certifications.",
    icon: <Shield className="w-5 h-5 text-green-500" />,
    status: "Secure",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1"
  },
  {
    title: "Smart Automation",
    description: "Automate repetitive tasks and workflows with intelligent process optimization.",
    icon: <Sparkles className="w-5 h-5 text-purple-500" />,
    status: "Beta",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1"
  },
  {
    title: "Global Scale",
    description: "Deploy worldwide with our distributed infrastructure and edge computing network.",
    icon: <Globe className="w-5 h-5 text-cyan-500" />,
    status: "Available",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1"
  }
];

function BentoGrid() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Featured Solutions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our comprehensive suite of tools designed to accelerate your business growth and streamline operations.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {bentoItems.map((item, index) => (
            <Card
              key={index}
              className={`
                group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                border-border bg-card text-card-foreground
                ${item.colSpan || "md:col-span-1"}
                ${item.rowSpan || "md:row-span-1"}
                ${item.featured ? "md:min-h-[400px]" : "md:min-h-[200px]"}
              `}
            >
              {/* Background Image */}
              {item.image && (
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                  {item.status}
                </span>
              </div>

              <CardHeader className="relative z-10 pb-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors duration-200">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </h3>
              </CardHeader>

              <CardContent className="relative z-10">
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                
                {item.featured && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Enterprise Ready</span>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 cursor-pointer">
            <Rocket className="w-4 h-4" />
            <span className="font-medium">Explore All Features</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BentoGrid;
