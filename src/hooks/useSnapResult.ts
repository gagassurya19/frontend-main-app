import { useState, useEffect } from 'react';
import { SnapResult, CompleteApiResult } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { transformApiResponseToSnapResult } from '@/utils/transformers';

export const useSnapResult = () => {
  const [snapResult, setSnapResult] = useState<SnapResult | null>(null);
  const [completeApiResult, setCompleteApiResult] = useState<CompleteApiResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load snap result from localStorage or API
    const loadSnapResult = () => {
      try {
        // First try to load complete API result
        const completeStored = localStorage.getItem(STORAGE_KEYS.LATEST_COMPLETE_API_RESULT);
        if (completeStored) {
          const completeData = JSON.parse(completeStored);
          setCompleteApiResult(completeData);
          
          // Transform to SnapResult for component compatibility
          const transformedResult = transformApiResponseToSnapResult(
            completeData,
            completeData.capturedImage || '',
            'current-user'
          );
          setSnapResult(transformedResult);
        } else {
          // Fallback to old transformed format
          const stored = localStorage.getItem(STORAGE_KEYS.LATEST_SNAP_RESULT);
          if (stored) {
            const parsedData = JSON.parse(stored);
            setSnapResult(parsedData);
            setCompleteApiResult(null);
          }
        }
      } catch (error) {
        console.error('Error loading snap result:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSnapResult();
  }, []);

  return {
    snapResult,
    completeApiResult,
    isLoading,
    setSnapResult,
    setCompleteApiResult,
  };
};

export type { SnapResult, CompleteApiResult }; 