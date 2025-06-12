import { WeeklyCaloriesResponse, DayData, DailyFoodHistoryResponse, DailyFood, DailyFoodSummary, WeeklyBenchmarkResponse } from '@/types/dashboard';
import { getAuthTokenFromCookie } from '@/utils/auth-cookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Get auth headers using existing utility
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthTokenFromCookie();
  return {
    'Content-Type': 'application/json',
    ...(token && { authorization: `Bearer ${token}` })
  };
};

// Handle API response with consistent error handling
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication failed');
    }
    if (response.status === 404) {
      throw new Error('Data not found');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.status !== 'success') {
    throw new Error('API request was not successful');
  }

  return data.data;
};

export const dashboardService = {
  async getWeeklyCalories(): Promise<{
    weeklyData: DayData[];
  }> {
    const token = getAuthTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const url = `${API_BASE_URL}/dashboard/weekly-calories`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const result = await handleResponse<{
        weeklyData: DayData[];
      }>(response);

      return {
        weeklyData: result.weeklyData,
      };

    } catch (error) {
      console.error('Error fetching weekly calories:', error);
      
      // Return fallback data for empty state instead of throwing error
      if (error instanceof Error && error.message.includes('Data not found')) {
        return {
          weeklyData: [],
        };
      }
      
      throw error;
    }
  },

  async getDailyFoodHistory(): Promise<{
    dailyFoodHistory: DailyFood[];
    summary: DailyFoodSummary;
  }> {
    const token = getAuthTokenFromCookie();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const url = `${API_BASE_URL}/dashboard/history-today`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const result = await handleResponse<{
        dailyFoodHistory: DailyFood[];
        summary: DailyFoodSummary;
      }>(response);

      return {
        dailyFoodHistory: result.dailyFoodHistory,
        summary: result.summary
      };

    } catch (error) {
      console.error('Error fetching daily food history:', error);
      
      // Return fallback data for empty state instead of throwing error
      if (error instanceof Error && error.message.includes('Data not found')) {
        return {
          dailyFoodHistory: [],
          summary: {
            totalCalories: 0,
            targetCalories: 2000,
            remainingCalories: 2000,
            foodCount: 0,
            date: new Date().toISOString().split('T')[0]
          }
        };
      }
      
      throw error;
    }
  },

  async getWeeklyBenchmark(): Promise<WeeklyBenchmarkResponse['data']> {
    try {
      const url = `${API_BASE_URL}/dashboard/weekly-benchmark`;
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const result = await handleResponse<WeeklyBenchmarkResponse['data']>(response);
      return result;
    } catch (error) {
      console.error('Error fetching weekly benchmark:', error);
      throw error;
    }
  }
}; 