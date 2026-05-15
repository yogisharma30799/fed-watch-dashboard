import { useState, useEffect, useRef } from 'react';
import { normalizeData, type RawEntry, type NormalizedEntry } from '../utils/dataFormatter';
import rawData from '../data/sample-data.json';

export const useLiveFeed = () => {
  const [allData] = useState<NormalizedEntry[]>(() => normalizeData(rawData as RawEntry[]));
  const [visibleData, setVisibleData] = useState<NormalizedEntry[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    setVisibleData(allData.slice(0, 5));
    indexRef.current = 5;

    const interval = setInterval(() => {
      if (indexRef.current < allData.length) {
        const nextItem = allData[indexRef.current];
        setVisibleData((prev) => [nextItem, ...prev]);
        indexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [allData]);

  return { visibleData };
};
