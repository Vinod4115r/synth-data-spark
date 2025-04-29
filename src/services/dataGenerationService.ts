
export interface Column {
  name: string;
  type: string;
  options?: {
    min?: number;
    max?: number;
    decimals?: number;
    values?: string[];
  };
}

export interface GenerationConfig {
  recordCount: number;
  modelType: string;
  variability: number;
  preserveRelationships: boolean;
}

// Generate a random string
const generateString = (length: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Generate a random number within a range
const generateNumber = (min: number = 0, max: number = 100, decimals: number = 0): number => {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
};

// Generate a random boolean
const generateBoolean = (): boolean => {
  return Math.random() > 0.5;
};

// Generate a random date within a range
const generateDate = (startDate: Date = new Date(2000, 0, 1), endDate: Date = new Date()): string => {
  const timeRange = endDate.getTime() - startDate.getTime();
  const randomTime = Math.random() * timeRange;
  const date = new Date(startDate.getTime() + randomTime);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

// Function to generate synthetic data based on schema and configuration
export const generateSyntheticData = (
  columns: Column[],
  config: GenerationConfig
): Promise<Record<string, any>[]> => {
  // In a real app, this would call an AI service or backend API
  // For the MVP, we're simulating with a basic random data generator

  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const data: Record<string, any>[] = [];

      for (let i = 0; i < config.recordCount; i++) {
        const record: Record<string, any> = {};
        
        columns.forEach((column) => {
          switch (column.type) {
            case 'string':
              record[column.name] = generateString(8);
              break;
            case 'number':
              const min = column.options?.min ?? 0;
              const max = column.options?.max ?? 100;
              const decimals = column.options?.decimals ?? 0;
              record[column.name] = generateNumber(min, max, decimals);
              break;
            case 'boolean':
              record[column.name] = generateBoolean();
              break;
            case 'date':
              record[column.name] = generateDate();
              break;
            default:
              record[column.name] = null;
          }
        });
        
        data.push(record);
      }
      
      resolve(data);
    }, 1500); // Simulate processing time
  });
};

// Helper function to export data as CSV
export const exportAsCSV = (data: Record<string, any>[]): void => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Add the headers
  csvRows.push(headers.join(','));
  
  // Add the data
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      // Handle string values that might contain commas
      return typeof val === 'string' ? `"${val}"` : val;
    });
    csvRows.push(values.join(','));
  }
  
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Create a link and trigger download
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `synthetic_data_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Helper function to export data as JSON
export const exportAsJSON = (data: Record<string, any>[]): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Create a link and trigger download
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `synthetic_data_${Date.now()}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
