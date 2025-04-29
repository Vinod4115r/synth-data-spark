
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from '@/components/layout/Header';
import { Database, Shield, LineChart, Code } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-app-primary/90 to-app-secondary py-20">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Generate High-Quality <br className="hidden sm:block" />Synthetic Data with AI
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Create realistic, privacy-preserving datasets for testing, 
            development, and machine learning without compromising real data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-app-primary hover:bg-gray-100">
              <Link to="/generator">
                Start Generating
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="#">
                Learn More
              </a>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-app-background" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-app-background">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-app-card p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-app-primary/10 rounded-full flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-app-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Schema-Based Generation</h3>
              <p className="text-gray-600">
                Upload or define your data schema and generate synthetic data that matches your requirements.
              </p>
            </div>
            
            <div className="bg-app-card p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-app-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-app-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy-Preserving</h3>
              <p className="text-gray-600">
                Generate data that maintains statistical properties without exposing sensitive information.
              </p>
            </div>
            
            <div className="bg-app-card p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-app-primary/10 rounded-full flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-app-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Statistical Accuracy</h3>
              <p className="text-gray-600">
                Preserve key statistical relationships and distributions from your original data.
              </p>
            </div>
            
            <div className="bg-app-card p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-app-primary/10 rounded-full flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-app-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Export Options</h3>
              <p className="text-gray-600">
                Export your synthetic datasets in CSV or JSON format for immediate use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to generate synthetic data?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Try our easy-to-use generator to create synthetic datasets for your projects.
          </p>
          <Button asChild size="lg">
            <Link to="/generator">
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-gray-300 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Database className="h-5 w-5 text-app-primary mr-2" />
              <span className="text-white font-medium">Synth Data Spark</span>
            </div>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} AI Synthetic Data Generator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
