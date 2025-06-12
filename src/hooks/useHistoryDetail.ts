import { useState, useEffect } from 'react';
import { historyService } from '@/services/historyService';
import { ProcessedHistoryDetail } from '@/types/history';

interface UseHistoryDetailState {
  historyDetail: ProcessedHistoryDetail | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
}

export const useHistoryDetail = (historyId: string) => {
  const [state, setState] = useState<UseHistoryDetailState>({
    historyDetail: null,
    loading: true,
    error: null,
    notFound: false,
  });

  const fetchHistoryDetail = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null, notFound: false }));

      const detail = await historyService.getHistoryDetail(historyId);

      setState(prev => ({
        ...prev,
        historyDetail: detail,
        loading: false,
        notFound: false,
      }));

    } catch (error) {
      console.error('Error fetching history detail:', error);
      
      const isNotFound = error instanceof Error && 
        (error.message.includes('Data not found') || error.message.includes('404'));
      
      const isAuthError = error instanceof Error && 
        error.message.includes('Authentication failed');
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: isAuthError 
          ? 'Session expired. Please login again.'
          : error instanceof Error 
            ? error.message 
            : 'Failed to load history detail',
        notFound: isNotFound,
        historyDetail: null,
      }));
    }
  };

  const refreshDetail = () => {
    fetchHistoryDetail();
  };

  useEffect(() => {
    if (historyId) {
      fetchHistoryDetail();
    }
  }, [historyId]);

  return {
    historyDetail: state.historyDetail,
    loading: state.loading,
    error: state.error,
    notFound: state.notFound,
    refreshDetail,
  };
}; 