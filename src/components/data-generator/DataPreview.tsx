
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from 'lucide-react';

interface DataPreviewProps {
  data: Record<string, any>[] | null;
  onRegenerate: () => void;
  onExportCsv: () => void;
  onExportJson: () => void;
}

const DataPreview: React.FC<DataPreviewProps> = ({ data, onRegenerate, onExportCsv, onExportJson }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const columns = Object.keys(data[0]);

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          <span>Data Preview</span>
          <Button variant="outline" size="sm" onClick={onRegenerate}>
            <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
          </Button>
        </CardTitle>
        <CardDescription>
          Showing first {Math.min(data.length, 100)} records of {data.length} generated
        </CardDescription>
      </CardHeader>
      <CardContent className="data-table">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 100).map((row, i) => (
              <tr key={i}>
                {columns.map((column) => (
                  <td key={column}>{String(row[column])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {data.length.toLocaleString()} records generated
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onExportCsv}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" onClick={onExportJson}>
            <Download className="mr-2 h-4 w-4" /> Export JSON
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DataPreview;
