
import React, { useState } from 'react';
import { 
  generateSyntheticData, 
  exportAsCSV, 
  exportAsJSON, 
  type Column as SchemaColumn 
} from '@/services/dataGenerationService';
import SchemaBuilder from '@/components/data-generator/SchemaBuilder';
import GeneratorConfig, { GeneratorConfigType } from '@/components/data-generator/GeneratorConfig';
import DataPreview from '@/components/data-generator/DataPreview';
import Stepper from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';

const STEPS = ["Define Schema", "Configure", "Generate"];

const DataGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<Record<string, any>[] | null>(null);
  const { toast: uiToast } = useToast();

  // In a real app, these would be managed through context or state libraries
  const [columns, setColumns] = useState<SchemaColumn[]>([]);
  
  const getColumnsFromSchemaBuilder = (): SchemaColumn[] => {
    // In a real app, we'd get this data from the SchemaBuilder component
    // For MVP, we're returning mock data
    return [
      { name: 'id', type: 'number', options: { min: 1, max: 10000 } },
      { name: 'full_name', type: 'string' },
      { name: 'age', type: 'number', options: { min: 18, max: 80 } },
      { name: 'income', type: 'number', options: { min: 20000, max: 150000, decimals: 2 } },
      { name: 'is_customer', type: 'boolean' },
      { name: 'signup_date', type: 'date' },
    ];
  };
  
  const handleNext = () => {
    if (currentStep === 0) {
      // Save columns from SchemaBuilder
      const schemaColumns = getColumnsFromSchemaBuilder();
      setColumns(schemaColumns);
    }
    
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };
  
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  const handleStepClick = (step: number) => {
    // Only allow going back or to completed steps
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };
  
  const handleGenerateData = async (config: GeneratorConfigType) => {
    setLoading(true);
    try {
      const schemaColumns = columns.length ? columns : getColumnsFromSchemaBuilder();
      const data = await generateSyntheticData(schemaColumns, config);
      setGeneratedData(data);
      toast.success(`Successfully generated ${data.length.toLocaleString()} records`);
    } catch (error) {
      console.error('Error generating synthetic data:', error);
      toast.error('Failed to generate data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleExportCsv = () => {
    if (generatedData) {
      exportAsCSV(generatedData);
      toast.success('Data exported as CSV');
    }
  };
  
  const handleExportJson = () => {
    if (generatedData) {
      exportAsJSON(generatedData);
      toast.success('Data exported as JSON');
    }
  };
  
  const handleRegenerate = async () => {
    if (columns.length > 0) {
      setLoading(true);
      try {
        // Use same configuration as before but regenerate data
        const data = await generateSyntheticData(columns, {
          recordCount: 1000,
          modelType: 'ctgan',
          variability: 50,
          preserveRelationships: true,
        });
        setGeneratedData(data);
        toast.success('Data regenerated successfully');
      } catch (error) {
        console.error('Error regenerating data:', error);
        toast.error('Failed to regenerate data');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-8">
      <Stepper steps={STEPS} currentStep={currentStep} onStepClick={handleStepClick} />
      
      {currentStep === 0 && (
        <div className="space-y-6">
          <SchemaBuilder />
          
          <div className="flex justify-end">
            <Button onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}
      
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-4">Configure Generation Settings</h2>
            </div>
            <div className="lg:col-span-3">
              <GeneratorConfig onGenerate={handleGenerateData} loading={loading} />
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              Back
            </Button>
            <Button onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Generated Synthetic Data</h2>
              {!generatedData && !loading && (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">Click the button below to generate data</h3>
                  <Button 
                    onClick={() => handleGenerateData({
                      recordCount: 1000,
                      modelType: 'ctgan',
                      variability: 50,
                      preserveRelationships: true
                    })}
                  >
                    Generate Data
                  </Button>
                </div>
              )}
              
              {loading && (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-app-primary"></div>
                </div>
              )}
              
              {generatedData && (
                <DataPreview 
                  data={generatedData} 
                  onRegenerate={handleRegenerate}
                  onExportCsv={handleExportCsv}
                  onExportJson={handleExportJson}
                />
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              Back to Configuration
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataGenerator;
