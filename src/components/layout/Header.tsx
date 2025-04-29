
import React from 'react';
import { Button } from "@/components/ui/button";
import { Database } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-app-card shadow-sm">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-app-primary" />
          <h1 className="text-xl font-bold text-foreground hidden sm:block">Synth Data Spark</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">Documentation</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
