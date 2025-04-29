
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Upload } from 'lucide-react';

type ColumnType = 'string' | 'number' | 'boolean' | 'date';

interface Column {
  id: string;
  name: string;
  type: ColumnType;
  options?: {
    min?: number;
    max?: number;
    decimals?: number;
    values?: string[];
  };
}

const SchemaBuilder: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: '1', name: 'id', type: 'number', options: { min: 1, max: 1000 } },
    { id: '2', name: 'name', type: 'string' },
    { id: '3', name: 'age', type: 'number', options: { min: 18, max: 65 } },
  ]);

  const addColumn = () => {
    const newId = `${columns.length + 1}`;
    setColumns([...columns, { id: newId, name: `column_${newId}`, type: 'string' }]);
  };

  const removeColumn = (id: string) => {
    setColumns(columns.filter(col => col.id !== id));
  };

  const updateColumnName = (id: string, name: string) => {
    setColumns(columns.map(col => col.id === id ? { ...col, name } : col));
  };

  const updateColumnType = (id: string, type: ColumnType) => {
    setColumns(columns.map(col => {
      if (col.id === id) {
        let options = {};
        switch(type) {
          case 'number':
            options = { min: 0, max: 100 };
            break;
          case 'date':
            options = {};
            break;
          case 'boolean':
            options = {};
            break;
          default:
            options = {};
        }
        return { ...col, type, options };
      }
      return col;
    }));
  };

  const updateColumnOptions = (id: string, options: any) => {
    setColumns(columns.map(col => col.id === id ? { ...col, options: { ...col.options, ...options } } : col));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, we would parse the file and extract the schema
      console.log("File selected:", file.name);
      // Mock data for demonstration
      setColumns([
        { id: '1', name: 'id', type: 'number', options: { min: 1, max: 1000 } },
        { id: '2', name: 'first_name', type: 'string' },
        { id: '3', name: 'last_name', type: 'string' },
        { id: '4', name: 'email', type: 'string' },
        { id: '5', name: 'age', type: 'number', options: { min: 18, max: 80 } },
        { id: '6', name: 'income', type: 'number', options: { min: 20000, max: 150000 } },
      ]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Define Your Data Schema</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Input 
              type="file" 
              className="absolute inset-0 opacity-0 w-full cursor-pointer" 
              onChange={handleFileUpload}
              accept=".csv,.json"
            />
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" /> 
              Upload Schema
            </Button>
          </div>
          <Button onClick={addColumn}>
            <Plus className="h-4 w-4 mr-1" /> Add Column
          </Button>
        </div>
      </div>

      <Card className="animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle>Column Definitions</CardTitle>
          <CardDescription>Define the structure of your synthetic dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-12 gap-4 font-medium text-sm text-muted-foreground pb-2 border-b">
              <div className="col-span-4">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-4">Options</div>
              <div className="col-span-1"></div>
            </div>

            {columns.map((column) => (
              <div key={column.id} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">
                  <Input 
                    value={column.name} 
                    onChange={(e) => updateColumnName(column.id, e.target.value)} 
                    placeholder="Column name"
                  />
                </div>
                <div className="col-span-3">
                  <Select 
                    value={column.type} 
                    onValueChange={(value) => updateColumnType(column.id, value as ColumnType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-4">
                  {column.type === 'number' && (
                    <div className="flex gap-2">
                      <Input 
                        type="number"
                        placeholder="Min"
                        value={column.options?.min || ''}
                        onChange={(e) => updateColumnOptions(column.id, { min: Number(e.target.value) })}
                      />
                      <Input 
                        type="number"
                        placeholder="Max"
                        value={column.options?.max || ''}
                        onChange={(e) => updateColumnOptions(column.id, { max: Number(e.target.value) })}
                      />
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeColumn(column.id)}
                    disabled={columns.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemaBuilder;
