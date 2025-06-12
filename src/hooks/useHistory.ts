import { useState, useEffect, useCallback } from 'react';
import { historyService } from '@/services/historyService';
import { ProcessedHistoryItem, HistoryQueryParams } from '@/types/history';

interface UseHistoryState {
  histories: ProcessedHistoryItem[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isEmpty: boolean;
}

interface UseHistoryFilters {
  searchQuery: string;
  selectedCategory: string;
  selectedTimeFilter: string;
  page: number;
  limit: number;
}

export const useHistory = () => {
  const [state, setState] = useState<UseHistoryState>({
    histories: [],
    loading: true,
    error: null,
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    isEmpty: false,
  });

  const [filters, setFilters] = useState<UseHistoryFilters>({
    searchQuery: '',
    selectedCategory: 'all',
    selectedTimeFilter: 'all',
    page: 1,
    limit: 50, // Load more items for better client-side filtering
  });

  const fetchHistory = useCallback(async (params?: HistoryQueryParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const queryParams: HistoryQueryParams = {
        page: params?.page || filters.page,
        limit: params?.limit || filters.limit,
        category: filters.selectedCategory !== 'all' ? filters.selectedCategory : undefined,
        ...params,
      };

      const result = await historyService.getUserHistory(queryParams);

      setState(prev => ({
        ...prev,
        histories: result.histories,
        pagination: result.pagination,
        loading: false,
        isEmpty: result.histories.length === 0,
      }));

    } catch (error) {
      console.error('Error fetching history:', error);
      
      // Handle authentication errors
      if (error instanceof Error && error.message.includes('Authentication failed')) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Session expired. Please login again.',
          histories: [],
          isEmpty: true,
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load history',
        isEmpty: true,
      }));
    }
  }, [filters.page, filters.limit, filters.selectedCategory]);

  // Client-side filtering for search and time
  const filteredHistories = state.histories.filter(history => {
    // Search filter
    const matchesSearch = history.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         history.notes.toLowerCase().includes(filters.searchQuery.toLowerCase());

    // Time filter
    let matchesTimeFilter = true;
    if (filters.selectedTimeFilter !== 'all') {
      const historyDate = new Date(history.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      switch (filters.selectedTimeFilter) {
        case 'today':
          const todayStr = today.toISOString().split('T')[0];
          matchesTimeFilter = history.date === todayStr;
          break;

        case 'week':
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);
          matchesTimeFilter = historyDate >= oneWeekAgo;
          break;

        case 'month':
          const oneMonthAgo = new Date(today);
          oneMonthAgo.setMonth(today.getMonth() - 1);
          matchesTimeFilter = historyDate >= oneMonthAgo;
          break;
      }
    }

    return matchesSearch && matchesTimeFilter;
  });

  // Get unique categories from histories
  const categories = ['all', ...Array.from(new Set(state.histories.map(h => h.category)))];

  // Group histories by date
  const groupedHistories = filteredHistories.reduce((groups: Record<string, ProcessedHistoryItem[]>, history) => {
    if (!groups[history.date]) {
      groups[history.date] = [];
    }
    groups[history.date].push(history);
    return groups;
  }, {});

  // Sort dates and histories
  const sortedGroupedHistories = Object.keys(groupedHistories)
    .sort((a, b) => b.localeCompare(a)) // Newest dates first
    .map(date => ({
      date,
      foods: groupedHistories[date].sort((a, b) => a.time.localeCompare(b.time)) // Sort by time within each day
    }));

  const totalCalories = filteredHistories.reduce((sum, history) => sum + history.calories, 0);

  // Filter setters
  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const setSelectedCategory = (category: string) => {
    setFilters(prev => ({ ...prev, selectedCategory: category }));
    // Refetch when category changes (server-side filter)
    if (category !== filters.selectedCategory) {
      fetchHistory({ category: category !== 'all' ? category : undefined });
    }
  };

  const setSelectedTimeFilter = (timeFilter: string) => {
    setFilters(prev => ({ ...prev, selectedTimeFilter: timeFilter }));
  };

  const refreshHistory = () => {
    fetchHistory();
  };

  // Load more data (pagination)
  const loadMore = () => {
    if (state.pagination.page < state.pagination.totalPages) {
      fetchHistory({ page: state.pagination.page + 1 });
    }
  };

  // Initial load
  useEffect(() => {
    fetchHistory();
  }, []); // Only run once on mount

  return {
    // Data
    histories: sortedGroupedHistories,
    filteredCount: filteredHistories.length,
    totalCalories,
    categories,

    // State
    loading: state.loading,
    error: state.error,
    isEmpty: state.isEmpty && !state.loading,
    pagination: state.pagination,

    // Filters
    searchQuery: filters.searchQuery,
    selectedCategory: filters.selectedCategory,
    selectedTimeFilter: filters.selectedTimeFilter,

    // Actions
    setSearchQuery,
    setSelectedCategory,
    setSelectedTimeFilter,
    refreshHistory,
    loadMore,

    // Computed
    hasActiveFilters: filters.searchQuery || filters.selectedCategory !== 'all' || filters.selectedTimeFilter !== 'all',
    canLoadMore: state.pagination.page < state.pagination.totalPages,
  };
}; 