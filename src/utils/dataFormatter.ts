export interface RawEntry {
  id: number;
  source: string;
  category: string;
  value: string | number;
  timestamp: string | number;
}

export interface NormalizedEntry {
  id: number;
  source: string;
  category: string;
  displayValue: string;
  numericValue: number;
  timestamp: Date;
  isInflationSurge?: boolean;
}

const parseValue = (val: string | number): number => {
  if (typeof val === 'number') return val;
  
  const cleanStr = val.replace(/[$,]/g, '').trim();
  
  if (cleanStr.endsWith('B')) {
    return parseFloat(cleanStr) * 1_000_000_000;
  }
  if (cleanStr.endsWith('M')) {
    return parseFloat(cleanStr) * 1_000_000;
  }
  if (cleanStr.endsWith('%')) {
    return parseFloat(cleanStr);
  }
  
  const parsed = parseFloat(cleanStr);
  return isNaN(parsed) ? 0 : parsed;
};

const parseDate = (ts: string | number): Date => {
  if (typeof ts === 'number') {
    // Assuming Unix timestamp in seconds
    return new Date(ts * 1000);
  }
  
  // Try standard Date parsing
  const date = new Date(ts);
  if (!isNaN(date.getTime())) return date;
  
  // Handle YYYY/MM/DD if it fails
  if (ts.includes('/')) {
    return new Date(ts.replace(/\//g, '-'));
  }
  
  return new Date();
};

export const normalizeData = (data: RawEntry[]): NormalizedEntry[] => {
  let lastInflationValue: number | null = null;

  return data.map((entry) => {
    const numericValue = parseValue(entry.value);
    const timestamp = parseDate(entry.timestamp);
    
    let isInflationSurge = false;
    if (entry.category.toLowerCase() === 'inflation') {
      if (lastInflationValue !== null) {
        const increase = (numericValue - lastInflationValue) / lastInflationValue;
        if (increase > 0.05) {
          isInflationSurge = true;
        }
      }
      lastInflationValue = numericValue;
    }

    return {
      id: entry.id,
      source: entry.source.toUpperCase(),
      category: entry.category,
      displayValue: String(entry.value),
      numericValue,
      timestamp,
      isInflationSurge,
    };
  });
};
