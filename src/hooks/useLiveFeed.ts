import { useState, useEffect, useRef } from 'react';
import { normalizeData, type RawEntry, type NormalizedEntry } from '../utils/dataFormatter';
import rawData from '../data/sample-data.json';

export const useLiveFeed = (isPaused: boolean = false) => {
  const [allData] = useState<NormalizedEntry[]>(() => normalizeData(rawData as RawEntry[]));
  const [visibleData, setVisibleData] = useState<NormalizedEntry[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    if (indexRef.current === 0) {
      setVisibleData(allData.slice(0, 5));
      indexRef.current = 5;
    }

    if (isPaused) return;

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
  }, [allData, isPaused]);

  return { visibleData };
};
