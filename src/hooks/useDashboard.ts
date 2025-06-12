import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import { DayData, DailyFood, DailyFoodSummary, WeeklyBenchmarkResponse } from '@/types/dashboard';

interface UseDashboardState {
  weeklyData: DayData[];
  dailyFoodHistory: DailyFood[];
  dailyFoodSummary: DailyFoodSummary | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  dailyFoodLoading: boolean;
  dailyFoodError: string | null;
  weeklyBenchmark: WeeklyBenchmarkResponse['data'] | null;
}

export const useDashboard = () => {
  const [state, setState] = useState<UseDashboardState>({
    weeklyData: [],
    dailyFoodHistory: [],
    dailyFoodSummary: null,
    loading: true,
    error: null,
    isEmpty: false,
    dailyFoodLoading: true,
    dailyFoodError: null,
    weeklyBenchmark: null,
  });

  const fetchWeeklyCalories = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const result = await dashboardService.getWeeklyCalories();

      const isEmpty = result.weeklyData.length === 0;

      setState(prev => ({
        ...prev,
        weeklyData: result.weeklyData,
        loading: false,
        isEmpty,
      }));

    } catch (error) {
      console.error('Error fetching weekly calories:', error);
      
      const isAuthError = error instanceof Error && 
        error.message.includes('Authentication failed');
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: isAuthError 
          ? 'Session expired. Please login again.'
          : error instanceof Error 
            ? error.message 
            : 'Failed to load dashboard data',
      }));
    }
  };

  const fetchDailyFoodHistory = async () => {
    try {
      setState(prev => ({ ...prev, dailyFoodLoading: true, dailyFoodError: null }));

      const result = await dashboardService.getDailyFoodHistory();

      setState(prev => ({
        ...prev,
        dailyFoodHistory: result.dailyFoodHistory,
        dailyFoodSummary: result.summary,
        dailyFoodLoading: false,
      }));

    } catch (error) {
      console.error('Error fetching daily food history:', error);
      
      const isAuthError = error instanceof Error && 
        error.message.includes('Authentication failed');
      
      setState(prev => ({
        ...prev,
        dailyFoodLoading: false,
        dailyFoodError: isAuthError 
          ? 'Session expired. Please login again.'
          : error instanceof Error 
            ? error.message 
            : 'Failed to load daily food history',
      }));
    }
  };

  const fetchWeeklyBenchmark = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await dashboardService.getWeeklyBenchmark();
      console.log(result);
      setState(prev => ({ ...prev, weeklyBenchmark: result }));
      setState(prev => ({ ...prev, loading: false }));
    } catch (error) {
      console.error('Error fetching weekly benchmark:', error);
      setState(prev => ({ ...prev, error: 'Failed to load weekly benchmark' }));
    }
  };

  const refreshDashboard = () => {
    fetchWeeklyCalories();
    fetchDailyFoodHistory();
  };

  useEffect(() => {
    fetchWeeklyCalories();
    fetchDailyFoodHistory();
    fetchWeeklyBenchmark();
  }, []);

  return {
    weeklyData: state.weeklyData,
    dailyFoodHistory: state.dailyFoodHistory,
    dailyFoodSummary: state.dailyFoodSummary,
    loading: state.loading,
    error: state.error,
    isEmpty: state.isEmpty,
    dailyFoodLoading: state.dailyFoodLoading,
    dailyFoodError: state.dailyFoodError,
    weeklyBenchmark: state.weeklyBenchmark,
    refreshDashboard,
  };
};  