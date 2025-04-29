
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';

interface GeneratorConfigProps {
  onGenerate: (config: GeneratorConfigType) => void;
  loading: boolean;
}

export type GeneratorConfigType = {
  recordCount: number;
  modelType: string;
  variability: number;
  preserveRelationships: boolean;
};

const GeneratorConfig: React.FC<GeneratorConfigProps> = ({ onGenerate, loading }) => {
  const [config, setConfig] = useState<GeneratorConfigType>({
    recordCount: 1000,
    modelType: 'ctgan',
    variability: 50,
    preserveRelationships: true,
  });

  const updateConfig = (key: keyof GeneratorConfigType, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle>Generation Settings</CardTitle>
        <CardDescription>Configure how your synthetic data will be generated</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Number of Records</label>
            <span className="text-sm text-muted-foreground">{config.recordCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-4">
            <Input 
              type="number" 
              value={config.recordCount} 
              onChange={(e) => updateConfig('recordCount', Number(e.target.value))}
              className="w-24" 
            />
            <Slider
              value={[config.recordCount]}
              min={100}
              max={50000}
              step={100}
              onValueChange={(value) => updateConfig('recordCount', value[0])}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">Generate between 100 and 50,000 records</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">AI Model Type</label>
          <Select 
            value={config.modelType} 
            onValueChange={(value) => updateConfig('modelType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ctgan">CTGAN (Conditional GAN)</SelectItem>
              <SelectItem value="tvae">TVAE (Tabular VAE)</SelectItem>
              <SelectItem value="copula">Gaussian Copula</SelectItem>
              <SelectItem value="fast">Fast Synthesis (Lower Quality)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Different models offer trade-offs between quality, speed, and handling specific data types
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Data Variability</label>
            <span className="text-sm text-muted-foreground">{config.variability}%</span>
          </div>
          <Slider
            value={[config.variability]}
            min={1}
            max={100}
            onValueChange={(value) => updateConfig('variability', value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Higher values create more diverse data, lower values stay closer to the original patterns
          </p>
        </div>

        <Button 
          className="w-full"
          onClick={() => onGenerate(config)}
          disabled={loading}
        >
          {loading ? (
            <>Generating Data...</>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Generate Synthetic Data
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GeneratorConfig;
